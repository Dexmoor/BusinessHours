It sometimes happens that you will need to programmatically set the value of a BusinessHours property editor. This page describes the process of doing so.

When saving a property, you will need to serialize a collection of `DaysOfBusinessViewModel` instances to JSON. When doing so, make sure to use camel case:

```csharp
IEnumerable<DaysOfBusinessViewModel> officeHours = GetOfficeHoursSomehow();
IContent contentNode = GetContentNodeSomehow();
var jsonSettings = new JsonSerializerSettings
{
    ContractResolver = new CamelCasePropertyNamesContractResolver(),
    Formatting = Formatting.Indented
};
contentNode.SetValue("officeHours", JsonConvert.SerializeObject(officeHours, jsonSettings));
Services.ContentService.Save(contentNode);
```

It is necessary to use camel case because this is how the back office JavaScript interacts with the data model.

When constructing instances of `DaysOfBusinessViewModel`, you will need the days of the week in addition to a GUID that corresponds to each day of the week:

```csharp
var days = new[]
{
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
};
var dayGuids = new[]
{
    Guid.Parse("764dc03a-6f77-4607-b7b6-f650200a39a5"),
    Guid.Parse("b138f333-b366-4f8a-891f-ea5d04e948b5"),
    Guid.Parse("2238d1fa-4d27-4b37-a12a-173518d0d105"),
    Guid.Parse("28020ef9-698a-4926-b5c4-b0a98fa15feb"),
    Guid.Parse("0f818d67-10a7-41ed-a2eb-ae5a4bbd213e"),
    Guid.Parse("2667efc2-6747-4a2a-a758-f934b0ec6952"),
    Guid.Parse("b3cc2ff7-ac75-47e8-a615-567f9d8f6b72")
};
```

These GUIDs must be exactly as shown (i.e., they are not automatically generated, but instead they correspond to days of the week).

If you want to create a model that has every day open from 9am to 6pm, you could do so with the following code:

```csharp
var officeHours = days
    .Select((x, i) => new DaysOfBusinessViewModel()
    {
        DayOfTheWeek = days[i],
        Id = dayGuids[i],
        IsOpen = true,
        HoursOfBusiness = new List<HoursOfBusinessViewModel>()
        {
            new HoursOfBusinessViewModel()
            {
                ByAppointmentOnly = false,
                Id = Guid.NewGuid(),
                OpensAt = "09:00 am",
                ClosesAt = "06:00 pm"
            }
        }
    })
    .ToList();
```

Note that this code snippet is referencing the `days` and `dayGuids` variables mentioned above. Also note that the ID for the `HoursOfBusinessViewModel` class is an arbitrary GUID (which is in contrast to the ID for the `DaysOfBusinessViewModel` class, which requires specific GUIDs).

You could then serialize that model as JSON and store it as a property value on a content node.
