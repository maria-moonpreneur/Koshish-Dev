// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import Launch from './screens/Launch';
import GetStarted from './screens/GetStarted';
import RegisterLogin from './screens/RegisterLogin';
import ChildName from './screens/ChildName';
import Gender from './screens/Gender';
import BirthDate from './screens/BirthDate';
import MotherTongueSelection from './screens/MotherTongue';
import Father from './screens/Father';
import Mother from './screens/Mother';
import Family from './screens/Family';
import Complaint from './screens/Complaint';
import ELARLATest from './screens/ELARLATest';
import AutismTest from './screens/AutismTest';
import Dashboard from './screens/Dashboard';
import Contact from './screens/Contact';
import Feedback from './screens/Feebback';
import UserData from './screens/UserData';
import Payment from './screens/Payment';
import Success from './screens/Success';
import Failure from './screens/Failure';
import Result from './screens/Results';
import FinalAnswers from './screens/FinalAnswers';
import EditDetails from './screens/EditDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Launch" component={Launch} options={{ headerShown: false }} />
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterLogin" component={RegisterLogin} options={{ headerShown: false }} />
        <Stack.Screen name="ChildName" component={ChildName} options={{ headerShown: false }} />
        <Stack.Screen name="Gender" component={Gender} options={{ headerShown: false }} />
        <Stack.Screen name="BirthDate" component={BirthDate} options={{ headerShown: false }} />
        <Stack.Screen name="MotherTongueSelection" component={MotherTongueSelection} options={{ headerShown: false }} />
        <Stack.Screen name="Father" component={Father} options={{ headerShown: false }} />
        <Stack.Screen name="Mother" component={Mother} options={{ headerShown: false }} />
        <Stack.Screen name="Family" component={Family} options={{ headerShown: false }} />
        <Stack.Screen name="Complaint" component={Complaint} options={{ headerShown: false }}/>
        <Stack.Screen name="ELARLATest" component={ELARLATest} options={{ headerShown: false }} />
        <Stack.Screen name="AutismTest" component={AutismTest} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name='Feedback' component={Feedback} options={{ headerShown: false }} />
        <Stack.Screen name='Contact' component={Contact} options={{ headerShown: false }} />
        <Stack.Screen name='UserData' component={UserData} options={{ headerShown: false }} />
        <Stack.Screen name='Payment' component={Payment} options={{ headerShown: false }} />
        <Stack.Screen name='Success' component={Success} options={{ headerShown: false }} />
        <Stack.Screen name='Failure' component={Failure} options={{ headerShown: false }} />
        <Stack.Screen name='Results' component={Result} options={{ headerShown: false}} />
        <Stack.Screen name='FinalAnswers' component={FinalAnswers} options={{ headerShown: false }} />
        <Stack.Screen name='EditDetails' component={EditDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;