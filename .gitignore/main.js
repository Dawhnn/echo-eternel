const Discord = require('discord.js');
const myBot = new Discord.Client();
myBot.login(process.env.TOKEN);

const prefix = '-';
var emojiyes = '✅';
var emojino = '❌';
var emojidelete = '🗑️';
var emojiquestion = '❔';
var channell;
var acceptedd;
var maybee
var acceptedList = [];
var maybeList = []
var messverif;
var msgtodelete;
var nomm;
var messagee;
var nameauthorr;
var imageurll;
var authorname = "";

function hook(channel, nom , message, nameauthor, accepted, maybe, imageurl) {
    channell = channel;
    var msg = new Discord.MessageEmbed();
        msg.setTitle(nom)
        msg.setThumbnail(imageurl)  
        msg.setFooter(nameauthor);
        msg.addField(emojiyes + "** Inscrits :**", accepted + '-', true)
        msg.addField(emojiquestion + "** Peut-être :**", maybe + '-', true)
        msg.setDescription(message);
        msg.addField("**Réagit avec :**", emojiyes + ' Si tu viens - ' + emojiquestion  + "Si tu n'es pas sur d'être la -\n" +  emojidelete + " Pour supprimer ta demande")
    return msg;
}

function ListToString(List) {
    var str = '';
    var isend = false;
    for(let i = 0; i < List.length; i ++) {
        if(List[i].startsWith("> ")) {
            List[i] = List[i].slice(2, List[i].length)
        }
        if(List[i] != '-') {
            var cas = List[i];
            List[i] = List[i].replace('-', '');
            /*for(let j = 0; j < List[i].length; j ++) {
                if (cas[j] === '-' && j != 0) {
                    isend = true;
                }
                if(isend && cas[j] === '-') {
                    cas.replaceAt(j, '')
                }
            }
            */
            if(i === List.length - 1) {
                str = str + '> ' + List[i]
            }
            else {
                str = str + '> ' + List[i] + '\n'
            }
        }
    }
    return str;
}

function IsStringTheSame(str1, str2) {
    var i = 0;
    var j = 0;
    var common = "";
    var begin = false;
    var stop = false;
    var strmin = "";
    var strmax = "";
    if(str1.length > str2.length) {
        strmin = str2;
        strmax = str1;
    }
    else {
        strmin = str1;
        strmax = str2;
    }
    while(i < strmin.length && j < strmax.length && stop === false) {
        if(strmin[i] === strmax[j]) {
            begin = true;
            common = common + strmin[i]
            i += 1;
            j += 1;
        }
        else {
            j += 1;
            if(begin === true) {
                stop = true;
            }
        }
    }
    return common;
}

function OnYesReaction(bot, channelID, messageID, username) {
    var isfound = false;
    myBot.guilds.cache.get(channelID).channels.cache.forEach(ch => {
        if (ch.type === 'text'){
            ch.messages.fetch({
                limit: 100  
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === bot.id)
                msgs.forEach(m => {
                    if(m.id === messageID) {
                        let acceptedList = []
                        for(let embed of m.embeds) {
                            nomm = embed.title;
                            messagee = embed.description;
                            imageurll = embed.thumbnail.url;
                            nameauthorr = embed.footer.text;
                            for(let f of embed.fields) {
                                if(f.name === emojiyes + "** Inscrits :**") {
                                    acceptedList = f.value.slice().split("\n");
                                }
                            }
                        }
                        //chope l'id du message     
                        //crée une array avec tous les noms des gens qui ont acceptés
                        for(let l = 0; l < acceptedList.length; l ++) {
                            var complistname = IsStringTheSame(acceptedList[l], username)
                            if(complistname === username) {
                                acceptedList.splice(l, 1)
                                isfound = true;
                            }
                        }
                        if(isfound) {
                            acceptedd = "";
                            acceptedd = ListToString(acceptedList);
                            var newmsg = hook(channell, nomm, messagee, nameauthorr, acceptedd, maybee, imageurll)
                        }
                        //si on trouve l'utilisateur dans la liste alors on enlève son nom de la liste 
                        //sinon on le rajoute à la liste
                        if(isfound === false) {
                            acceptedList.push(username);
                            acceptedd = "";
                            var dak = ListToString(acceptedList);
                            for(let embed of m.embeds) {
                                for (let f of embed.fields) {
                                    if(f.name === emojiquestion + "** Peut-être :**") {
                                        maybeList = f.value.slice().split("\n");
                                    }
                                }
                            }
                            for(let l = 0; l < maybeList.length; l ++) {
                                var complistname = IsStringTheSame(maybeList[l], username)
                                if(complistname === username) {
                                    maybeList.splice(l, 1)
                                }
                            }
                            maybee = "";
                            maybee = ListToString(maybeList);
                            var newmsg = hook(channell, nomm, messagee, nameauthorr, dak, maybee, imageurll);
                        }
                        m.edit(newmsg);
                    }
                })
            })
        }
    })
}

async function OnMaybeReaction(bot, channelID, messageID, username) {
    var isfound = false;
    myBot.guilds.cache.get(channelID).channels.cache.forEach(ch => {
        if (ch.type === 'text'){
            ch.messages.fetch({
                limit: 100  
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === bot.id)
                msgs.forEach(m => {
                    if(m.id === messageID) {
                        let maybeList = []
                        for(let embed of m.embeds) {
                            nomm = embed.title;
                            messagee = embed.description;
                            imageurll = embed.thumbnail.url;
                            nameauthorr = embed.footer.text;
                            for (let f of embed.fields) {
                                if(f.name === emojiquestion + "** Peut-être :**") {
                                    maybeList = f.value.slice().split("\n");
                                }
                            }
                        }
                        for(let k = 0; k < maybeList.length; k ++) {
                            var complistname = IsStringTheSame(maybeList[k], username)
                            if(complistname === username) {
                                maybeList.splice(k, 1)
                                
                                isfound = true;
                            }
                        }
                        if(isfound) {
                            maybee = "";
                            maybee = ListToString(maybeList);
                            var newmsg = hook(channell, nomm, messagee, nameauthorr, acceptedd, maybee, imageurll)
                        }
                        if(isfound === false) {
                            maybeList.push(username)
                            maybee = "";
                            var peutetre = ListToString(maybeList)
                            for(let embed of m.embeds) {
                                for(let f of embed.fields) {
                                    if(f.name === emojiyes + "** Inscrits :**") {
                                        acceptedList = f.value.slice().split("\n");
                                    }
                                }
                            }
                            for(let l = 0; l < acceptedList.length; l ++) {
                                var complistname = IsStringTheSame(acceptedList[l], username)
                                if(complistname === username) {
                                    acceptedList.splice(l, 1)
                                }
                            }
                            acceptedd = "";
                            acceptedd = ListToString(acceptedList);
                            var newmsg = hook(channell, nomm, messagee, nameauthorr, acceptedd, peutetre, imageurll)
                        }
                        m.edit(newmsg);
                    }
                })
            })
        }
    })
}
async function OnNoReaction(bot, channelID, messageID, username) {
    myBot.guilds.cache.get(channelID).channels.cache.forEach(ch => {
        if (ch.type === 'text'){
            ch.messages.fetch({
                limit: 100  
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === bot.id)
                msgs.forEach(m => {
                    if(m.id === messageID) {
                        let maybeList = []
                        for(let embed of m.embeds) {
                            nomm = embed.title;
                            messagee = embed.description;
                            imageurll = embed.thumbnail.url;
                            nameauthorr = embed.footer.text;
                            for (let f of embed.fields) {
                                if(f.name === emojiquestion + "** Peut-être :**") {
                                    maybeList = f.value.slice().split("\n");

                                }
                            }
                        }
                        for(let k = 0; k < maybeList.length; k ++) {
                            var complistname = IsStringTheSame(maybeList[k], username)
                            if(complistname === username) {
                                maybeList.splice(k, 1)
                            }
                        }
                        let acceptedList = []
                        for(let embed of m.embeds) {
                            for(let f of embed.fields) {
                                if(f.name === emojiyes + "** Inscrits :**") {
                                    acceptedList = f.value.slice().split("\n");
                                }
                            }
                        }
                        for(let l = 0; l < acceptedList.length; l ++) {
                            var complistname = IsStringTheSame(acceptedList[l], username)
                            if(complistname === username) {
                                acceptedList.splice(l, 1)
                            }
                        }
                            acceptedd = "";
                            acceptedd = ListToString(acceptedList);
                            maybee = "";
                            maybee = ListToString(maybeList);
                            var newmsg = hook(channell, nomm, messagee, nameauthorr, acceptedd, maybee, imageurll)
                        m.edit(newmsg);
                    }
                })
            })
        }
    })
}

myBot.on('messageReactionAdd',(reaction, user) =>{
    var username = user.username
    if(reaction.emoji.name === emojiyes && user.username != myBot.user.username && !reaction.message.content.startsWith('Es')){
        let message = reaction.message;
        name = user.username;
        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
        try {
            for (const reaction of userReactions.values()) {
                reaction.users.remove(user.id);
            }
        } catch (error) {
            console.error('Failed to remove reactions.');
        }
        OnYesReaction(myBot.user, '597855191659970560', message.id, user.username)
    }
    if(reaction.emoji.name === emojiquestion && user.username != myBot.user.username) {
        let message = reaction.message
        name = user.username;
        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
        try {
            for (const reaction of userReactions.values()) {
                reaction.users.remove(user.id);
            }
        } catch (error) {
            console.error('Failed to remove reactions.');
        }
        OnMaybeReaction(myBot.user, '597855191659970560', message.id, user.username)
    }
    if(reaction.emoji.name === emojino && user.username != myBot.user.username && !reaction.message.content.startsWith('Es')) {
        let message = reaction.message;
        name = user.username;
        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
        try {
            for (const reaction of userReactions.values()) {
                reaction.users.remove(user.id);
            }
        } catch (error) {
            console.error('Failed to remove reactions.');
        }
        OnNoReaction(myBot.user, '597855191659970560', message.id, user.username)
    }
    let message = reaction.message;
    var isempty = false;
    if(reaction.emoji.name === emojidelete && user.username != myBot.user.username) {
        myBot.guilds.cache.get('597855191659970560').channels.cache.forEach(ch => {
            if (ch.type === 'text'){
                ch.messages.fetch({
                    limit: 100  
                }).then(messages => {
                    const msgs = messages.filter(m => m.author.id === myBot.user.id)
                    msgs.forEach(m => {
                        if(m.id === message.id) {
                            for(let embed of m.embeds) {
                                if(!isempty) {
                                    authorname = embed.footer.text.substr(18)
                                    isempty = true;
                                }
                            }
                        }
                    })
                })
            }
        })
    }
    if(reaction.emoji.name === emojidelete && user.username != myBot.user.username && user.username === authorname /*|| /*user.id === '222010488395923456' || user.id === '415217104082698252'*/ && !reaction.message.content.startsWith('Es')) {
        let message = reaction.message
        msgtodelete = message
        var chan = message.channel;
        name = user.username;
        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
        try {
            for (const reaction of userReactions.values()) {
                reaction.users.remove(user.id);
            }
        } catch (error) {
        console.error('Failed to remove reactions.');
        }
    messverif = "Es-tu sur de vouloir annuler ta demande ?"
    chan.send(messverif)
    }
    if(reaction.emoji.name === emojiyes && user.username != myBot.user.username  && user.username === authorname /*|| user.id === '222010488395923456' || user.id === '415217104082698252'*/ && reaction.message.content.startsWith('Es')) {    
        let  message = reaction.message
        msgtodelete.delete();
        message.delete();
        message.channel.send("La demande d'activité de " + user.username +" a été annulée.")
    }
    if (reaction.emoji.name === emojino && user.username != myBot.user.username && user.username === authorname /*|| user.id === '222010488395923456' || user.id === '415217104082698252'*/ && reaction.message.content.startsWith('Es')) {
        let message = reaction.message
        message.delete();
        msgtodelete.react(emojidelete);
    }
})

myBot.on('message', data => {
    if(data.author.id === '377600920067899392' || data.author.id === '222010488395923456' || data.author.id === '415217104082698252') {
        if (data.content.startsWith(prefix + 'deleteall')) {
            myBot.guilds.cache.get('597855191659970560').channels.cache.forEach(ch => {
                if (ch.type === 'text'){
                    ch.messages.fetch({
                        limit: 100  
                    }).then(messages => {
                        const msgs = messages.filter(m => m.author.id === myBot.user.id)
                        msgs.forEach(m => { 
                            m.delete();
                        })
                    })
                }
            })
        }
    }
})

myBot.on('message', data => {
    if(data.content.startsWith('-awake')) {
        data.delete()
        var mess = hook(data.channel,'Цуурай цуурайтах болтугай', 'Message' + '\n' + '➖➖➖➖➖➖\n' + '**Décollage : ** \n' + "Décollage" + '\n' + '➖➖➖➖➖➖\n', 'Demande faite par NameAuthor', ListToString(['<@' + data.author.id + '>']), "", 'https://cdn.discordapp.com/emojis/626928125967597568.png');
        data.channel.send(mess)
    }
    myBot.guilds.cache.get('597855191659970560').channels.cache.forEach(ch => {
        if (ch.type === 'text'){
            ch.messages.fetch({
                limit: 100  
            }).then(messages => {
                
                const msgs = messages.filter(m => m.author.id === myBot.user.id)
                msgs.forEach(m => {
                    for(let embed of m.embeds) {
                        nomm = embed.title;
                        if(nomm === 'Цуурай цуурайтах болтугай') {
                            m.delete();
                        }
                    }
                })
            })
        }
    })
})

myBot.on('message', data => {
    if(data.author.id == myBot.user.id && !data.content.startsWith('La') && !data.content.startsWith('Es') && !data.content.startsWith("<") && !data.content.startsWith("/")) {
        data.react(emojiyes);
        data.react(emojiquestion);
        data.react(emojino);
        data.react(emojidelete);
    }
    if(data.author.id == myBot.user.id && data.content.startsWith('Es')) {
        data.react(emojiyes)
        data.react(emojino)
    }
    if (data.content.startsWith(prefix + 'demande')){
        data.delete();
        if(data.content.startsWith(prefix + 'demanderaid')) {
            data.reply('<@&618698709131198465>')
            //.then(msg => {
            //    msg.delete()
            //})
            let hookArgs = data.content.slice(prefix.length + 11).split(";");
            var mess = hook(data.channel,'__**' + hookArgs[0] + '**__', hookArgs[1] + '\n' + '➖➖➖➖➖➖\n' + '**Décollage : ** \n' + hookArgs[2] + '\n' + '➖➖➖➖➖➖\n', 'Demande faite par ' + data.author.username, ListToString([data.author.username]), "", 'https://cdn.discordapp.com/emojis/626928125967597568.png');
            data.channel.send(mess)
        }

        else if(data.content.startsWith(prefix + 'demandepve')) {
            data.reply('<@&625416369260855330>')
            .then(msg => {
                msg.delete()
            })
            let hookArgs = data.content.slice(prefix.length + 10).split(";");
            var mess = hook(data.channel,'__**' + hookArgs[0] + '**__', hookArgs[1] + '\n' + '➖➖➖➖➖➖\n' + '**Décollage : ** \n' + hookArgs[2] + '\n' + '➖➖➖➖➖➖\n', 'Demande faite par ' + data.author.username, ListToString([data.author.username]), "", 'https://cdn.discordapp.com/emojis/626928103175749632.png');
            data.channel.send(mess)
        }

        else if(data.content.startsWith(prefix + 'demandepvp')) {
            data.reply('<@&618699227949957133>')
            .then(msg => {
                msg.delete()
            })
            let hookArgs = data.content.slice(prefix.length + 10).split(";");
            var mess = hook(data.channel,'__**' + hookArgs[0] + '**__', hookArgs[1] + '\n' + '➖➖➖➖➖➖\n' + '**Décollage : ** \n' + hookArgs[2] + '\n' + '➖➖➖➖➖➖\n', 'Demande faite par ' + data.author.username, ListToString([data.author.username]), "", "https://cdn.discordapp.com/emojis/626928115473711104.png");
            data.channel.send(mess)
        }

        else if(data.content.startsWith(prefix + 'demandegambit')) {
            data.reply('<@&625415777146634240>')
            .then(msg => {
                msg.delete()
            })
            let hookArgs = data.content.slice(prefix.length + 13).split(";");
            var mess = hook(data.channel,'__**' + hookArgs[0] + '**__', hookArgs[1] + '\n' + '➖➖➖➖➖➖\n' + '**Décollage : ** \n' + hookArgs[2] + '\n' + '➖➖➖➖➖➖\n', 'Demande faite par ' + data.author.username, ListToString([data.author.username]), "", "https://cdn.discordapp.com/emojis/626928076059574273.png");            
            data.channel.send(mess)
        }

        else if(data.content.startsWith(prefix + 'demandetriomphe')) {
            data.reply('<@&618699356840656897>')
            .then(msg => {
                msg.delete()
            })
            let hookArgs = data.content.slice(prefix.length + 10).split(";");
            var mess = hook(data.channel,'__**' + hookArgs[0] + '**__', hookArgs[1] + '\n' + '➖➖➖➖➖➖\n' + '**Décollage : ** \n' + hookArgs[2] + '\n' + '➖➖➖➖➖➖\n', 'Demande faite par ' + data.author.username, ListToString([data.author.username]), "",)
            data.channel.send(mess)}

        else{
            let hookArgs = data.content.slice(prefix.length + 8).split(";");
            var mess = hook(data.channel,'__**' + hookArgs[0] + '**__', hookArgs[1] + '\n' + '➖➖➖➖➖➖\n' + '**Décollage : ** \n' + hookArgs[2] + '\n' + '➖➖➖➖➖➖\n', 'Demande faite par ' + data.author.username, ListToString([data.author.username]), "", "https://cdn.discordapp.com/attachments/626264273651236894/627285109174829056/Fichier_2.png")
            data.channel.send(mess);
    }}})
