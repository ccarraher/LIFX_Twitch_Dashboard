# LIFX_Twitch_Dashboard

*** This application was built for my brother's bday, NOT for multiple users, hence some design choices ***

This application was built with React on the frontend and NodeJS on the backend. 

It consumes 2 API's, LIFX, an LED company, and Twitch.

It allows the user to specify the settings they would like to invoke when a certain Twitch event happens. For example, the user can change/configure different animations for the lights to play when they receive a new follower on Twitch. Essentially giving the user a very friendly and interactive way to customize their streaming experience, thanks to React. 

This is achieved by a websocket server subscribed to a user's followers/subs from Twitch's EventSub API that will send a request of the settings specified by the user to the LIFX API.

I had a lot of fun with this project and hope to do more with it in the future, but for now it is abandoned until my brother has more requests. 
