import React, { useState } from 'react';
import Logo from './Logo'
import './App.css';
import worddata from './wordlist'

let wordlist=[]
for(let i =0;i<worddata.length;i++){
  wordlist[i]=worddata[ Math.floor(Math.random()*worddata.length)]
 
}

function App() {
 
  const [currentWord, setCurrentWord] = useState(0)
  const [started, setStarted] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [value, setValue] = useState('')
  const [time,setTime] = useState(30)
   const [initialTime,setInitialTime] = useState(time)
  const [isCorrect, setIsCorrect] = useState(true)
  const callback = ()=>{setCurrentWord(currentWord+1); setValue('')}
  const addTime = ()=>{
    setTime(time+5);
    setInitialTime(initialTime+5);
  }
  const subtractTime = ()=>{
    setTime(time-5);
    setInitialTime(initialTime-5);
  }

  const handleValue=()=>{
    wordlist[currentWord].includes(value)?
      wordlist[currentWord]==value?
        callback():setIsCorrect(true)
        : setIsCorrect(false)
  }
  const handleDone=()=>{
    if(time<=0){setIsDone(true)}
    
  }
  setTimeout(()=>{time>0&&started?setTime(time-1):handleDone()},1000)
  return (
    
    <div className="App" style={{backgroundColor:'#0f6894', height:'100vh', flexDirection:'column', display:'flex',overflowY:'scroll'}}>

        <h1 style={{fontSize:'5vh', color:'white', }}><span style={{fontSize:'10vh',color:'#ffd30f'}}>7</span> Fast Fingers</h1>
        <div style={{width:'60%', minHeight:'290px', backgroundColor:'#9dc5d1',overflow:'hidden', alignSelf:'center', borderRadius:30}}>
        <div style={{margin:'20px',display:'flex', flexWrap:'wrap',flexDirection:'row'}} >
        <div style={{border:'black solid 3px', borderRadius:15, paddingLeft:10, paddingRight:10 }}><h1 style={{color:isCorrect?'white':'red', }} >{wordlist[currentWord]}</h1></div>
        
        {wordlist.map((value,index)=>{
          if(index!==currentWord&& index>= currentWord){
            return(<h1 style={{marginLeft:'10px', alignSelf:'center', color:'#575757'}} >{value}</h1>)
          }
        })}
        
        </div>
        
        </div>
        <div style={{display:'flex', flexDirection:'row', alignSelf:'center', height:'50px', width:'60%', marginTop:'30px',}}>
    
        <input disabled={isDone} value={!isDone?value:Math.floor(currentWord*60/initialTime) +' WPM!'} onChange={e=>{setValue(e.target.value); handleValue(); setStarted(true)}} 
        style={{color:isDone?'white':"black",backgroundColor:isDone?'#8bc462':'white',borderColor:'white',borderRadius:15,
        fontSize:'32px', fontWeight:'bold',
        flex:4, display:'flex'}} />
         <button 
         disabled={started}
         onClick={()=>!started?subtractTime():undefined}
         style={{ backgroundColor:'#eb9f13',border:'none',paddingRight:15,marginLeft:5,borderTopLeftRadius:15, borderBottomLeftRadius:15,paddingLeft:15, alignContent:'center'}}><h1 style={{margin:0,color:'white'}}>-</h1></button>
       
        <div style={{flex:1, backgroundColor:'#ebb513',padding:'5px'}} ><h1 style={{color:'white',margin:0, alignSelf:'flex-end', flexWrap:'wrap'}}>Time: {time}</h1></div>
       
        <button 
        disabled={started}
        onClick={()=>!started?addTime():undefined}
        style={{ backgroundColor:'#eb9f13',border:'none',borderTopRightRadius:15, borderBottomRightRadius:15,paddingRight:15, alignContent:'center'}}><h1 style={{margin:0,color:'white'}}>+</h1></button>
        
        
        <button onClick={() => window.location.reload(false)} style={{flex:1, backgroundColor:'#8bc462',border:'none',marginLeft:5, borderRadius:15,paddingLeft:15}}><h1 style={{margin:0,color:'white'}}>Again!</h1></button>
        </div>
        <h1 style={{color:'white', marginTop:'5%', fontSize:'5vh'}}>By Kevin Jonathan</h1>
        <Logo style={{height:100}}/>
        <h1 style={{color:'#61DAFB', fontSize:'5vh'}}>Made with React.js</h1>
    </div>
  );
}

export default App;
