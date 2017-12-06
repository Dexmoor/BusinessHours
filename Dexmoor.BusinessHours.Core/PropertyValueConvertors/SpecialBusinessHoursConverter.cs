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

          
            //Only all dates in the future 
            var specialDates = data.Where(x => x.Date !=null && x.Date >= DateTime.Now.Date);
            return specialDates;
        }
    }
}
