from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from taggings.models import Tagging
from taggings.serializers import TaggingSerializer

class TaggingIndex(APIView):

    def get(self, request, format=None):
        taggings = Tagging.objects.all()
        serializer = TaggingSerializer(taggings, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        items = request.data['items'].split('_')
        activities = request.data['activities'].split('_')
        categories = request.data['categories'].split('_')

        for (item, category) in zip(items, categories):
            for activity in activities:
                activity = activity.split('-').join(' ')
                data = {"item": item, "activity": activity, "category":category}
                tag = Tagging.objects.filter(item=item, activity=activity)
                if tag:
                    tag[0].count += 1
                    tag[0].save()
                else:
                    serializer = TaggingSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(items)


class TaggingTrip(APIView):

    def get(self, request, format=None):
        hyp_activities = request.GET.get('activities').split('_')
        activities = []
        for activity in hyp_activities:
            act = ' '.join(activity.split('-'))
            activities.append(act)

        limit = int(request.GET.get('limit'))
        tags = Tagging.objects.filter(activity__in=activities).order_by('-count')[:limit]
        serializer = TaggingSerializer(tags, many=True)
        return Response(serializer.data)
