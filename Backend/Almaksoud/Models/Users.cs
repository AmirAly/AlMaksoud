using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Almaksoud.Models;
using System.Data;
namespace Almaksoud.Models
{
    public class Users
    {
        Almaksoud.Models.AlmaksoudDBEntities DataStore = new AlmaksoudDBEntities();
        public User Get(int _id)
        {
            if (DataStore.Users.Any(U => U.Id == _id))
                return DataStore.Users.Single(U => U.Id == _id);
            else
                return null;
        }
        public User Login(string _email, string _password)
        {
            if (DataStore.Users.Any(U => U.Email == _email && U.Password == _password))
            {
                User u = DataStore.Users.Single(U => U.Email == _email && U.Password == _password);
                u.Password = null;
                return u;
            }
            else
                return null;
        }
        public List<User> GetAll()
        {
            if (DataStore.Users != null && DataStore.Users.Count() > 0)
                return DataStore.Users.ToList();
            else
                return null;
        }
        public User Create(User _user)
        {
            if (DataStore.Users.Any(U => U.Email == _user.Email))
            {
                return null;
            }
            else
            {
                DataStore.Users.Add(_user);
                DataStore.SaveChanges();
                return _user;
            }
        }
        public User Edit(User _user)
        {
            if (!DataStore.Users.Any(U => U.Email == _user.Email))
            {
                return null;
            }
            else
            {
                DataStore.Users.Attach(_user);
                DataStore.Entry(_user).State = EntityState.Modified;
                DataStore.SaveChanges();
                return _user;
            }
        }
        public int Remove(int _id)
        {
            if (!DataStore.Users.Any(U => U.Id == _id))
            {
                return 0;
            }
            else
            {
                DataStore.Users.Remove(DataStore.Users.Single(u => u.Id == _id));
                DataStore.SaveChanges();
                return 1;
            }
        }
    }
}