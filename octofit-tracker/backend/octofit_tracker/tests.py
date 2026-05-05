from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Marvel')
        self.assertEqual(str(team), 'Marvel')
    def test_user_creation(self):
        team = Team.objects.create(name='DC')
        user = User.objects.create(name='Bruce Wayne', email='bruce@wayne.com', team=team)
        self.assertEqual(str(user), 'Bruce Wayne')
