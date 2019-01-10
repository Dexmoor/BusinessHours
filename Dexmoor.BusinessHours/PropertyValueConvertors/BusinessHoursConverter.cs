using Newtonsoft.Json;
using System.Collections.Generic;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Dexmoor.BusinessHours.PropertyValueConvertors
{
        [PropertyValueType(typeof(IEnumerable<ViewModels.DaysOfBusinessViewModel>))]
        [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.ContentCache)]
        public class BusinessHoursConverter : PropertyValueConverterBase
        {

            public override bool IsConverter(PublishedPropertyType propertyType)
            {
                return propertyType.PropertyEditorAlias.Equals("Dexmoor.BusinessHours");
            }

            public override object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview)
            {
                if (source == null)
                {
                    return new List<ViewModels.DaysOfBusinessViewModel>();
                }

                var data = JsonConvert.DeserializeObject<IEnumerable<ViewModels.DaysOfBusinessViewModel>>((string)source);
                return data;
            }

    }
}
