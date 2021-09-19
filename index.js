const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '?';
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const commands = require('./commands/play');
const karlovoID = '692062297711050862';

client.once('ready', () => {
    console.log('uz jedu');
    
    
});

let songQueue = new Map()
    songQueue.songID = new Array('g');
    songQueue.queueLength = 1;
    songQueue.nowPlaying = 1;
    songQueue.nowPlayingName = 1;
    songQueue.volume = 5;
    songQueue.playing = false;

songQueue.nowPlayingName = songQueue.songID[songQueue.nowPlaying];
console.log(songQueue);

client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    console.log(`${message.author}: ${message.content}`);




    if(command === 'ping'){
        message.channel.send('Pong');
        message.reply('Pinging...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            resultMessage.edit(`Bot latency: ${ping}, API latency: ${client.ws.ping}`)
        }); 



    }else if(command === "play"){
        if(command === "play"){
            var link = message.content.slice(5);
            console.log(link);
             if(message.content.includes('https' || 'http')){
                 if(message.member.voice.channel == null){
                     message.channel.send('You must be in a voice channel');
                 }
                 if(songQueue.playing){
                     console.log('if songqueue playing');
                     songQueue.songID.push(await ytdl.getURLVideoID(link));
                     songQueue.url.set(songID);

                 }else{
                     console.log('it got here');
                    if(songQueue.queueLength === 1){
                        const connection = await message.member.voice.channel.join();
                        const dispatcher = connection
                        dispatcher.play(ytdl(songQueue.songID[1]));
                        dispatcher.on("play", () => {
                            console.log('playing');
                        });
                    }
                    const connection = await message.member.voice.channel.join();
                    const dispatcher = connection;
                    console.log('it is here lul');
                    while(songQueue.songID.lenght - songQueue.nowPlaying != 0 || songQueue.queueLength == 1){
                        console.log('in loop');
                        songQueue.songID.push(await ytdl.getURLVideoID(link));
                        //console.log(songQueue.songID);
                        dispatcher.play(ytdl(songQueue.songID[songQueue.nowPlaying]));
                        message.channel.send(`Now playing: tuhle sracku musim dodelat`);
                        message.channel.send('ma to delay jak pica');
                        dispatcher.on("play", () => {
                            console.log('playing');
                        });
                        dispatcher.on("finish", () => {
                            songQueue.nowPlaying = songQueue.nowPlaying + 1;
                            dispatcher.stop();
                        });
                    }
                    if(songQueue.queueLength - songQueue.nowPlaying == -1){
                        message.channel.send('The queue ended, leaving the voice channel');
                        message.member.voice.channel.leave();
                        songQueue.songID.lenght = 0;
                    }
                    
                 }
                 
             }else{
                 message.channel.send('Link invalid');
            }



        }
    }
});

client.login('ODQzNTY0NDI4ODYzMDc4NDUw.YKFsmA.48TPqmCt-cPmTdwHe8qkpSYS_AQ')