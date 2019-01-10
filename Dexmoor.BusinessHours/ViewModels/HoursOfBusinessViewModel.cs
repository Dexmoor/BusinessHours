using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dexmoor.BusinessHours.ViewModels
{
  public class HoursOfBusinessViewModel
  {
    public Guid Id { get; set; }
    public string OpensAt { get; set; }
    public string ClosesAt { get; set; }
    public bool ByAppointmentOnly { get; set; } = false;
    }
}
