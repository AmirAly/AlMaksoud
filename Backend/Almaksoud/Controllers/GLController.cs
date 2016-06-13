using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Almaksoud.Models;
using System.Web.Script.Serialization;
using System.Web.Http.Cors;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Configuration;
namespace Almaksoud.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GLController : ApiController
    {
        Users DataLayer = new Users();
        String spreadsheetId = ConfigurationManager.AppSettings["GLSheetId"];
        [HttpGet]
        public object GetLatest()
        {
            // Create Google Sheets API service.
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = WebApiApplication.credential,
                ApplicationName = WebApiApplication.ApplicationName,
            });

            // Define request parameters.
            String range = "Data!A2:Z";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                    service.Spreadsheets.Values.Get(spreadsheetId, range);
            ValueRange response = request.Execute();
            IList<IList<Object>> values = response.Values;
            return values;
        }
        [HttpPost]
        public object Create(SheetRow _Row)
        {
            // Create Google Sheets API service.
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = WebApiApplication.credential,
                ApplicationName = WebApiApplication.ApplicationName
            });

            // Define request parameters.
            SpreadsheetsResource.ValuesResource.GetRequest request =
                    service.Spreadsheets.Values.Get(spreadsheetId, "Data!A:B");
            ValueRange response = request.Execute();
            IList<IList<Object>> values = response.Values;
            ValueRange v = new ValueRange();
            v.Range = "Data!A" + (values.Count + 1) + ":Z" + (values.Count + 1);
            IList<IList<object>> ret = new List<IList<object>>();
            IList<object> row = new List<object>();
            IList<ValueRange> lst = new List<ValueRange>();
            foreach (string s in _Row.Row)
            {
                row.Add(s);
            }
            ret.Add(row);
            v.Values = ret;
            lst.Add(v);
            Google.Apis.Sheets.v4.Data.BatchUpdateValuesRequest _body = new Google.Apis.Sheets.v4.Data.BatchUpdateValuesRequest();
            _body.Data = lst;
            _body.ValueInputOption = "RAW";
            v.MajorDimension = "ROWS";
            SpreadsheetsResource.ValuesResource.BatchUpdateRequest request2 =
                    service.Spreadsheets.Values.BatchUpdate(_body, spreadsheetId);
            request2.Fields = "totalUpdatedRows";
            BatchUpdateValuesResponse response2 = request2.Execute();
            return response2.TotalUpdatedRows;
        }
        [HttpPost]
        public object Edit(SheetRow _Row)
        {
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = WebApiApplication.credential,
                ApplicationName = WebApiApplication.ApplicationName
            });
            ValueRange v = new ValueRange();
            v.Range = "Data!A" + _Row.RowIndex;
            IList<IList<object>> ret = new List<IList<object>>();
            IList<object> row = new List<object>();
            IList<ValueRange> lst = new List<ValueRange>();
            foreach (string s in _Row.Row)
            {
                row.Add(s);
            }
            ret.Add(row);
            v.Values = ret;
            lst.Add(v);
            Google.Apis.Sheets.v4.Data.BatchUpdateValuesRequest _body = new Google.Apis.Sheets.v4.Data.BatchUpdateValuesRequest();
            _body.Data = lst;
            _body.ValueInputOption = "RAW";
            v.MajorDimension = "ROWS";
            SpreadsheetsResource.ValuesResource.BatchUpdateRequest request2 =
                    service.Spreadsheets.Values.BatchUpdate(_body, spreadsheetId);
            request2.Fields = "totalUpdatedColumns,totalUpdatedRows";
            BatchUpdateValuesResponse response2 = request2.Execute();
            return response2.TotalUpdatedRows;
        }
    }
}