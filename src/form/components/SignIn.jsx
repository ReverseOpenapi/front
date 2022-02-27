import React, {useState}  from 'react'

export default function SignIn () {

    // const user = ""
    // const [user, setUser] = useState("")
    // const rememberMe = false
    const [data, setData] = useState({
      user : "",
      rememberMe : false
    })
   
   const handleChange = (event) => {
      const input = event.target;
      const value = input.type === 'checkbox' ? input.checked : input.value;
    //  input.name = value
    console.log(input.name)
     console.log(input)
      // this.setState({ [input.name]: value });
      setData({[input.name]: value })
    };
   
   const handleFormSubmit = () => {
        localStorage.setItem('rememberMe', data.rememberMe);
        localStorage.setItem('user',data.rememberMe ? data.user : '');
    };

    console.log (localStorage.getItem('user'))
   
        return (
            <form onSubmit={handleFormSubmit}>
              <label>
                User: <input name="user" value={data.user} onChange={handleChange}/>
              </label>
              <label>
                <input name="rememberMe" checked={data.rememberMe} onChange={handleChange} type="checkbox"/> Remember me
              </label>
              <button type="submit">Sign In</button>
            </form>
          );
  }