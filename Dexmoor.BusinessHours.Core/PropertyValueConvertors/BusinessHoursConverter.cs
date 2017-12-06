using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Dexmoor.BusinessHours.Core.PropertyValueConvertors
{
   public class BusinessHoursConverter
    {
        [PropertyValueType(typeof(IEnumerable<ViewModels.DaysOfBusinessViewModel>))]
        [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.ContentCache)]
        public class SpecialHoursOfBusinessConverter : PropertyValueConverterBase
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
}
