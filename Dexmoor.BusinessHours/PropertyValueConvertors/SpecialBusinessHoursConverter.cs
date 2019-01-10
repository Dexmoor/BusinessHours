using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Dexmoor.BusinessHours.PropertyValueConvertors
{
    [PropertyValueType(typeof(IEnumerable<ViewModels.SpecialDaysOfBusinessViewModel>))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.ContentCache)]
    public class SpecialBusinessHoursConverter : PropertyValueConverterBase
    {

        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("Dexmoor.SpecialBusinessHours");
        }

        public override object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null)
            {
                return new List<ViewModels.SpecialDaysOfBusinessViewModel>();
            }

            


            var data = JsonConvert.DeserializeObject<IEnumerable<ViewModels.SpecialDaysOfBusinessViewModel>>((string)source);


            var umbracoHelper = new Umbraco.Web.UmbracoHelper(Umbraco.Web.UmbracoContext.Current);
            var dataTypePrevalues = umbracoHelper.DataTypeService.GetPreValuesCollectionByDataTypeId(propertyType.DataTypeId);

           bool removeOldDates =dataTypePrevalues.PreValuesAsDictionary.First(x => x.Key == "removeOldDates").Value.Value == "1";

            //Only all dates in the future 
            if (removeOldDates) { 
                return data.Where(x => x.Date != null && x.Date.Date >= DateTime.Now.Date.Date).ToList();
            }
            return data;
        }
    }
}
