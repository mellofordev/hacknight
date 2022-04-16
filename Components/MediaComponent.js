import React,{ useEffect } from 'react';
import {StyleSheet, Text, View,ActivityIndicator,TextInput,Image,FlatList,Dimensions,TouchableOpacity,RefreshControl,ScrollView,SafeAreaView} from 'react-native';
import env from '../env'
export default function MediaComponent(){
    const bearerToken = env.btoken.toString();
    const [Data,setData]=React.useState([]);
    const [loading,setLoading]=React.useState(true);
    const [text,setText]=React.useState('elonmusk');
    const [refresh,setRefresh]=React.useState(false);
    const width_ =Dimensions.get('window').width;
    const suggest_obj=[{name:'memes'},{name:'quotes'},{name:'trends'},{name:'motivation'},{name:'images'},{name:'instagram'}]
    const apiRequest=()=>{
    setLoading(true);
    fetch(`https://api.twitter.com/2/tweets/search/recent?query=${text}&expansions=attachments.media_keys&media.fields=url&max_results=100`,{
        method:'GET',
        headers:{
        
        'Authorization':`Bearer ${bearerToken}`,
        'Content-Type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
    
        setData(data.includes.media);
        setLoading(false);
    })
    .catch(e=>{console.log(e)})
    }
    useEffect(()=>{
    apiRequest();
    },[text])
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
     }
    const _refresh_ = React.useCallback(()=>{
        setRefresh(true);
        wait(2000).then(()=>{
            setRefresh(false);
            
        })
        apiRequest();
    },[])
   
    return(
        <View style={styles.container}>
        <SafeAreaView>
        <View style={{marginBottom:5,width:width_}}>
            <TextInput placeholder='search topic...' onChangeText={(text)=>{setText(text)}} style={{height:50,width:'100%',backgroundColor:'#D3D3D3',borderRadius:15,marginLeft:5,marginRight:5}}/>
            <View>
        <ScrollView horizontal={true} style={{margin:5}}>
              
               {suggest_obj.map((i)=>{
                   return(
                   <TouchableOpacity  style={styles.suggestedText} onPress={()=>{setText(i.name);}}><Text>{i.name}</Text></TouchableOpacity>
                   );
               })}
        </ScrollView>
        </View>
        </View>   
         
         {loading==true ? <ActivityIndicator color={'black'} /> :(
             <View>
            <FlatList 
             data={Data}
             keyExtractor={(item)=>{item.media_key.toString()}}
             ListFooterComponent={()=>{
                 return(
                <View style={{marginBottom:100}}>
                    <Text style={{fontSize:24,textAlign:'center'}}>the end.</Text>
                </View>
                 );
             }}
             refreshControl={
                 <RefreshControl enabled={true}
                 refreshing={refresh}
                 onRefresh={_refresh_}
                 />
             }
             renderItem={(item)=>{
              
               return(
                   <View style={{flexDirection:'column'}} > 
                    {item.item.type!="video" && 
                    <View> 
                    <Image source={{uri:item.item.url}} style={{height:550,width:width_,resizeMode:'contain',justifyContent:'center',alignItems:'center'}}/>
                    <TouchableOpacity><Text style={{textAlign:'left'}}>Download</Text></TouchableOpacity>
                    <View style={{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:'gray'}}></View>
                    </View>
                    
                    }
                  </View>
               );
             }}
            />
            
            </View>
          ) 
          }
          </SafeAreaView>   
          </View>
    ); 
}

const styles = StyleSheet.create({
    container:{
        marginTop:90,
        flexDirection:'column',
        margin:5,
       

    },
    suggestedText:{
        fontSize:18,
        borderColor:'black',
        borderRadius:15,
        borderWidth:StyleSheet.hairlineWidth,
        width:100,
        marginEnd:15,
        height:'100%',
        textAlign:'center',
        
    }
})

