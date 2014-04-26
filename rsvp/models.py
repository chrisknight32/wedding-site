from django.db import models

# Create your models here.
class Invite(models.Model):
    name = models.CharField(max_length=50)
    note = models.TextField(blank=True)

    def __unicode__(self):
        return self.name

class Person(models.Model):
    invite = models.ForeignKey(Invite)
    first_name = models.CharField("person's first name", max_length=50)
    last_name = models.CharField("person's last name", max_length=50)
    email = models.EmailField("person's email", max_length=254, blank=True)
    going = models.BooleanField()

    def __unicode__(self):
        return self.first_name + " " + self.last_name + ": " + self.email

    class Meta:
        verbose_name_plural = "people"
