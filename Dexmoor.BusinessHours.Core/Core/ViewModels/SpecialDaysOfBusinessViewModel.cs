using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dexmoor.BusinessHours.Core.ViewModels
{
  public class SpecialDaysOfBusinessViewModel
  {
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public bool IsOpen { get; set; }
    public List<HoursOfBusinessViewModel> HoursOfBusiness { get; set; }     
  }
}
