from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from trips.models import Trip
from trips.serializers import TripSerializer
# Create your views here.
@csrf_exempt
def trip_list(request):
    """
    All trips, or create new trip.
    """

    if request.method == 'GET':
        trips = Trip.objects.all()
        serializer = TripSerializer(trips, many = True)
        return JsonResponse(serializer.data , safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TripSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def trip_detail(request, pk):
    """
    Retrieve, update or delete a trip.
    """
    try:
        trip = Trip.objects.get(pk=pk)
    except Trip.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TripSerializer(trip)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TripSerializer(trip, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        trip.delete()
        return HttpResponse(status=204)
