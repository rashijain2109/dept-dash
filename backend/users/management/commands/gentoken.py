from django.core.management.base import BaseCommand, CommandError
from auth.views import get_token_for_user
from users.models import Faculty, ResearchScholar, Student


class Command(BaseCommand):
    help = "Generate and print a JWT token for user"
    role_model = {
        "faculty": Faculty,
        "hod": Faculty,
        "scholar": ResearchScholar,
        "student": Student,
    }

    def add_arguments(self, parser):
        parser.add_argument("role", choices=self.role_model)
        parser.add_argument("--pk", help="Primary key of specific user")

    def handle(self, role, pk=None, **others):
        Model = self.role_model[role]
        user = None
        try:
            if pk:
                user = Model.objects.get(pk=pk)
            elif Model != Faculty:
                user = Model.objects.first()
            else:
                for user in Faculty.objects.all():
                    if not ((role == "hod") ^ user.is_hod):
                        break
                else:
                    raise Faculty.DoesNotExist
            if not user:
                raise Model.DoesNotExist
        except Model.DoesNotExist:
            raise CommandError("No such user found")
        if others["verbosity"] > 1:
            self.stdout.write(f"User: {user}\n")
        self.stdout.write(str(get_token_for_user(user)))
