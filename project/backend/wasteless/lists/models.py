from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class List(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def get_burndown_rate(self):
        burndown = 0
        for listitem in self.listitem_set.all():
            time_until_stale = listitem.expiration_date - timezone.now()
            if time_until_stale.days >= 0:
                burndown += listitem.calories // (time_until_stale.days + 1)

        return burndown


class ListItem(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=1)
    calories = models.IntegerField()
    purchase_date = models.DateTimeField('Date of purchase')
    expiration_date = models.DateTimeField('Date of expiration')
    consumption_date = models.DateTimeField('Date of consumption')

    parent_list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def is_expired(self):
        return self.expiration_date <= timezone.now()
