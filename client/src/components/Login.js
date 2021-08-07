import React from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import FOG from 'vanta/dist/vanta.fog.min';

const Login = (props) => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(FOG({
            el: myRef.current,
            mouseControl: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            midWidth: 200.00,
            highlightColor: 0xe823e8,
            midtoneColor: 0x8d00f0,
            baseColor: 0x0,
            blurFactor: 0.60,
            speed: 0.50,
            zoom: 1.5
        }))
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy()
      }
    }, [vantaEffect])
    return <div ref={myRef}>
      <Grid container spacing={0} alignItems="center" justify="center" alignContent="center" style={{ minHeight: "100vh" }} overflow="hidden">
            <Grid item xs={12} align="center">
                <h1 style={{fontSize: "4em"}}>Welcome to your Twitch LED Control Panel</h1>
            </Grid>
            <Grid item xs={12} align="center">
                <Button style={{fontSize: "2em"}}/*onClick={handleClick}*/ href="https://id.twitch.tv/oauth2/authorize?client_id=x2bfzk1uii2v7sevq4zda6tkse9grq&redirect_uri=https://lifxtwitch.ngrok.io/home&response_type=token&scope=channel:read:subscriptions">Sign in with Twitch</Button>
            </Grid>
        </Grid> 
    </div>
}

export default Login;