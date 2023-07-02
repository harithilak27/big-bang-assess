import {React, useState} from 'react';
import Select from 'react-select';
import {Link,useNavigate} from 'react-router-dom';
import './Register.css';
import axios from 'axios';
 
const role = [
    {id:'role',name: 'doctor', value: 'doctor', label: 'doctor'},
    {id:'role',name: 'patient', value: 'patient', label: 'patient'}
]

function Register() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        userid: undefined,
        firstname: undefined,
        lastname: undefined,
        gender: '',
        role: undefined,
        email: undefined,
        passwordClear: undefined,
        disabledButton: true
    });

    const [doctorCredentials,setdoctorCredentials] = useState([{
        userid: undefined,
        firstname: undefined,
        lastname: undefined,
        gender: undefined,
        role: undefined,
        email: undefined,
        passwordClear: undefined,
        specification: undefined,
        experience: undefined
      }])
      

    // <Login data={credentials.id}></Login>
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        
        if(credentials.id !== undefined && credentials.firstname !== undefined && credentials.lastname !== undefined && credentials.gender !== '' && credentials.role !== undefined && credentials.email !== undefined && credentials.passwordClear !== undefined){
            credentials.disabledButton = false;
        }
    };
    
    if(credentials.role === 'doctor'){
      var handleDoctorRole = (e) => { 
        setdoctorCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
      
      var handleDoctorRegister= async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("https://localhost:7192/api/Doctor", doctorCredentials);
          console.log(res);
          navigate('/doctor')
        } catch (err) {
          console.log(err);
        }
      }
    }else{ 
    var handleClick = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("https://localhost:7192/api/User/Register", credentials);
          console.log(res);
          navigate('/patient')
        } catch (err) {
          console.log(err);
        }
      };
    }
    console.log(doctorCredentials);
    // const res = axios.post("https://localhost:7192/api/User/Register", credentials);
    return (
      
    <div>
      <form>
        <div className='form'>
            <div className="roles">
                <label>roles :</label>
                <Select options={role} id='role' className='role' placeholder="select your role" onChange={(selectedOptions) => { 
                    let e = { target: { name: 'role', value: selectedOptions.value } };
                    handleChange(e);
                    // handleDoctorRole(e);
                  }
                }>
                </Select>
            </div>
            <label>UserName :</label>
            <input required type='text' id='userid' className='userid' name='userid'  placeholder='username' onChange={(e) => {handleChange(e); handleDoctorRole(e) }} />
            <label>First name :</label>
            <input required type='text' id='fistname' className='firstname'  name='firstname' placeholder='firstname'  onChange={(e) => {handleChange(e); handleDoctorRole(e)}}/>
            <label>Last name :</label>
            <input required type='text' id='lastname' className='lastname' name='lastname'  placeholder='lastname'  onChange={(e) => {handleChange(e); handleDoctorRole(e)}}/>
            <div className='radio'>
            <label>gender :</label>
            <input required type='radio'  className='gender' name='gender' value='male'   onChange={(e) => {handleChange(e); handleDoctorRole(e)}}/> male
            <input required type='radio'  className='gender' name='gender' value='female'  onChange={(e) => {handleChange(e); handleDoctorRole(e)}}/> female
            </div>
            <label>Email :</label>
            <input type='email' name='email'id='email' className='email' placeholder='@gmail.com'   onChange={(e) => {handleChange(e); handleDoctorRole(e)}}/>
            <label>Password :</label>
            <input type='password' name='passwordClear' id='password' className='password'  placeholder='password' onChange={(e) => {handleChange(e); handleDoctorRole(e)}} />
            {
            credentials.role === 'doctor' ? 
            <div>
            <label>Medical Role :</label>
            <input type='text' name='specification' id='specification' className='specification' placeholder='specification' onChange={(e) => {handleDoctorRole(e)}} />
            <label>Experience :</label>
            <input type='text' name='experience' id='experience' className='experience'  placeholder='experience' onChange={(e) => {handleDoctorRole(e)}} />
            </div> : null
            }
            <Link to='/'>
              <button disabled={credentials.disabledButton} onClick={credentials.role === 'doctor' ? handleDoctorRegister : handleClick }>Sign in</button>
            </Link>
        </div>
      </form>
    </div>
    
  )
}

export default Register
