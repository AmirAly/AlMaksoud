using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Almaksoud.Models;
using System.Web.Script.Serialization;
using System.Web.Http.Cors;

namespace Almaksoud.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {

        Users DataLayer = new Users();
        JavaScriptSerializer Serializer = new JavaScriptSerializer();
        public string Get(int id)
        {
            Response _res = new Response();
            User User = DataLayer.Get(id);
            if (User == null)
            {
                _res.Code = 0;
                _res.Data = null;
            }
            else
            {
                _res.Code = 100;
                _res.Data = User;
            }
            return Serializer.Serialize(_res);
        }
        public string GetAll()
        {
            Response _res = new Response();
            List<User> Users = DataLayer.GetAll();
            if (Users == null)
            {
                _res.Code = 0;
                _res.Data = null;
            }
            else
            {
                _res.Code = 100;
                _res.Data = Users;
            }
            return Serializer.Serialize(_res);
        }

        [HttpPost]
        public string Signin(User _user)
        {
            Response _res = new Response();
            User User = DataLayer.Login(_user.Email, _user.Password);
            if (User == null)
            {
                _res.Code = 0;
                _res.Data = null;
            }
            else
            {
                _res.Code = 100;
                _res.Data = User;
            }
            return Serializer.Serialize(_res);
        }
        [HttpPost]
        public string Create(User _user)
        {
            Response _res = new Response();
            User User = DataLayer.Create(_user);
            if (User == null)
            {
                _res.Code = 0;
                _res.Data = null;
            }
            else
            {
                _res.Code = 100;
                _res.Data = User;
            }
            return Serializer.Serialize(_res);
        }
        [HttpPost]
        public string Edit(User _user)
        {
            Response _res = new Response();
            User User = DataLayer.Edit(_user);
            if (User == null)
            {
                _res.Code = 0;
                _res.Data = null;
            }
            else
            {
                _res.Code = 100;
                _res.Data = User;
            }
            return Serializer.Serialize(_res);
        }
        [HttpPatch]
        public string Delete(int id)
        {
            Response _res = new Response();
            int res = DataLayer.Remove(id);
            if (res == 0)
            {
                _res.Code = 0;
                _res.Data = null;
            }
            else
            {
                _res.Code = 100;
                _res.Data = null;
            }
            return Serializer.Serialize(_res);
        }
    }
}
