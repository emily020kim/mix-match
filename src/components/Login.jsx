import { gapi } from 'gapi-script';
import { GoogleLogin } from "@leecheuk/react-google-login";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mix-logo.png';
import { Card, CardBody, Image, Center } from '@chakra-ui/react';
import client from '../client';


const Login = () => {
  const navigate = useNavigate();

  function start() {
    gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_API_TOKEN,
        scope: "profile",
    });
  }
  gapi.load("client:auth2", start);

  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
      })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen bg-slate-600'>
      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
        <div className='p-5'>
          <Card maxW='sm'>
            <CardBody>
              <Image
                src={logo}
                alt='logo'
                mb={6}
              />

              <Center>
                <GoogleLogin
                  clientId="your-client-id"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Center>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login