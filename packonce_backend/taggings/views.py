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

        for item in items:
            for activity in activities:
                data = {"item": item, "activity": activity}
                tag = Tagging.objects.filter(item=item, activity=activity)
                if tag:
                    count1 = tag[0].count
                    tag[0].count = count1 + 1
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
        activities = request.GET.get('activities').split('_')
        tags = []
        for activity in activities:
            tags += Tagging.objects.filter(activity=activity)
        serializer = TaggingSerializer(tags, many=True)
        return Response(serializer.data)
