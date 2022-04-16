import React,{ useEffect } from 'react';
import {StyleSheet, Text, View,ActivityIndicator,ScrollView,Image,FlatList} from 'react-native';
import env from '../env'
export default function MediaComponent(){
    const bearerToken = env.btoken.toString();
    const [Data,setData]=React.useState([]);
    const [loading,setLoading]=React.useState(true);
    const apiRequest=()=>{
    fetch('https://api.twitter.com/2/tweets/search/recent?query=tiktok&expansions=attachments.media_keys&media.fields=url',{
        method:'GET',
        headers:{
        
        'Authorization':`Bearer ${bearerToken}`,
        'Content-Type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data.data);
        setData(data.includes.media);
        setLoading(false);
    })
    .catch(e=>{console.log(e)})
    }
    useEffect(()=>{
    apiRequest();
    },[])   
    return(
        <View style={styles.container}>
        {loading==true ? <ActivityIndicator color={'black'} /> :(
            <FlatList 
             data={Data}
             keyExtractor={(item)=>{item.media_key.toString()}}
             renderItem={(item)=>{
                 console.log(item.item);
               return(
                   <View style={{flexDirection:'column'}} > 
                    <Text>{item.item.type}</Text>
                     
                    {item.item.type!="video" &&  <Image source={{uri:item.item.url}} style={{height:550,width:350,resizeMode:'contain'}}/>}
                  </View>
               );
             }}
            />
          ) 
          }
          </View>
    ); 
}

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        flexDirection:'column',
        margin:5,
       

    }
})

