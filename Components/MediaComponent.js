import React,{ useEffect } from 'react';
import {StyleSheet, Text, View,ActivityIndicator,TextInput,Image,FlatList,Dimensions} from 'react-native';
import env from '../env'
export default function MediaComponent(){
    const bearerToken = env.btoken.toString();
    const [Data,setData]=React.useState([]);
    const [loading,setLoading]=React.useState(true);
    const [text,setText]=React.useState('elonmusk');
    const width_ =Dimensions.get('window').width;
    const apiRequest=()=>{
    fetch(`https://api.twitter.com/2/tweets/search/recent?query=${text}&expansions=attachments.media_keys&media.fields=url&max_results=100`,{
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
    },[text])   
    return(
        <View style={styles.container}>
        <View style={{marginBottom:5,width:width_}}>
            <TextInput placeholder='search topic...' onChangeText={(text)=>{setText(text)}} style={{height:50,width:'100%',backgroundColor:'#D3D3D3',borderRadius:15,marginLeft:5,marginRight:5}}/>
        </View>    
         {loading==true ? <ActivityIndicator color={'black'} /> :(
            <FlatList 
             data={Data}
             keyExtractor={(item)=>{item.media_key.toString()}}
             renderItem={(item)=>{
                 console.log(item.item);
               return(
                   <View style={{flexDirection:'column'}} > 
                    <Text>{item.item.type}</Text>
                     
                    {item.item.type!="video" && 
                    <View style={{justifyContent:'center',alignItems:'center'}}> 
                    <Image source={{uri:item.item.url}} style={{height:550,width:350,resizeMode:'contain'}}/>
                    </View>
                    }
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

