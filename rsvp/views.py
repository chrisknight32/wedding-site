from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rsvp.models import Invite, Person, Response
import simplejson as json

def respond(request, invite_id):
    if request.method == 'GET':
        invite = get_object_or_404(Invite, inviteId=invite_id)
        people = []
        for person in invite.people.all():
            people.append({"id":person.id, "first": person.first_name, "last": person.last_name})
        response_data = json.dumps({"invite": invite_id, "people": people})
        return HttpResponse(response_data, content_type="application/javascript")
    else:
        invite = get_object_or_404(Invite, inviteId=invite_id)
        # For each person, look for the response in the submission.
        replys = []
        for person in invite.people.all():
            going = request.POST.has_key(str(person.id))
            replys.append({
                "first": person.first_name,
                "last": person.last_name,
                "going": "Yes" if going else "No"
                })
            resp = Response(person=person, going=going)
            resp.save()
        return HttpResponse(json.dumps(replys), content_type="application/javascript")
