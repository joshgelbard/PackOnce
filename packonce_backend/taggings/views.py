from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from taggings.models import Tagging
from taggings.serializers import TaggingSerializer

# @csrf_exempt

class TaggingIndex(APIView):

    def get(self, request, format=None):
        taggings = Tagging.objects.all()
        serializer = TaggingSerializer(taggings, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        items = request.data['item'].split('_')
        activities = request.data['activities'].split('_')

        for item in items:
            for activity in activities:
                data = {"item": item, "activity": activity}
                serializer = TaggingSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(items)


class TaggingTrip(APIView):

    def get(self, request, format=None):
        return Response(request.data)

# class TripDetail(APIView):
#
#     def get_object(self, pk):
#         try:
#             return Trip.objects.get(pk=pk)
#         except Trip.DoesNotExist:
#             raise Http404
#
#     def get(self, reuqest, pk, format=None):
#         trip = self.get_object(pk)
#         serializer = TripSerializer(trip)
#         return Response(serializer.data)
#
#     def put(self, request, pk, format=None):
#         trip = self.get_object(pk)
#         serializer = TripSerializer(trip, data= request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         trip = self.get_object(pk)
#         trip.delete()
