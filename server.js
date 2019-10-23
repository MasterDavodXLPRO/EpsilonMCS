const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
   console.log("Conectado!");

   client.user.setPresence( {
    status: "online",
    game: {
        name: "usa: *help",
        type: "PLAYING"
    }
} );

client.on("guildMemberAdd", (member) => {
  console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${member.guild.name}.`);
  var canal = client.channels.get('631957754072006667'); 
  canal.send(`${member.user}, Bienvenido a EpsilonMC Server. Usa el comando *ip para ver la ip.`);
  
});

client.on("guildMemberRemove", (member) => {
  console.log(`Un usuario menos:  ${member.user.username} se a ido del servidor ${member.guild.name}.`);
  var canal = client.channels.get('631957754072006667'); 
  canal.send(`${member.user}, Ha salido del servidor.`);
  
});

});
var prefix = config.prefix;

client.on("message", (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const amount = args.join(' ');
 
// Mensajes sin permiso para todos:

    if (message.content.startsWith(prefix +"help")){
        message.channel.send({embed: {
          color: 800070,
          author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
          },
          title: "**__Help EpsilonMC Server__**",
          url: "https://epsilonmc.webnode.com",
          description: "Aqui tienes la ayuda sobre comandos y paginas web.",
          fields: [{
              name: "**Entra a nuestra web para ver Eventos y Novedades Unicas.**",
              value: "[Click Aqui](https://epsilonmc.webnode.com) para ir a la Web"
            },
            {
              name: "**__Comandos de Usuario:__**",
              value: "Los comandos de usuario son: *ip, *staff, *help. (Mas proximamente)"
            },
            {
              name: "**__Comandos Staff:__**",
              value: "Tienen: *ban, *kick"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "epsilonmc.webnode.com"
          }
        }
    });
    } else
    if (message.content.startsWith(prefix +"staff")){
        message.channel.send({embed: {
          color: 800070,
          author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
          },
          title: "**Staff EpsilonMC Server**",
          description: "Aqui tienes a nuestro staff:",
          fields: [{
              name: "**Helpers:**",
              value: "- Proximamente"
            },
            {
              name: "**Moderadores:**",
              value: "- Proximamente"
            },
            {
              name: "**Administradores:**",
              value: "- Proximamente"
            },
            {
              name: "**Fundador y Owner:**",
              value: "- Fundador: Pixi - Owner: davod345 -"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "epsilonmc.webnode.com"
          }
        }
    });
    } else
    if (message.content.startsWith(prefix +"ip")){
      message.channel.send({embed: {
        color: 800070,
        description: "Ip: play.epsilonmcs.tk"
      }});
    } else
if(command === 'server'){

  var server = message.guild;

  const embed = new Discord.RichEmbed()
  .setThumbnail(server.iconURL)
  .setAuthor(server.name, server.iconURL)
  .addField('ID', server.id, true)
  .addField('Region', server.region, true)
  .addField('Creado el', server.joinedAt.toDateString(), true)
  .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
  .addField('Miembros', server.memberCount, true)
  .addField('Roles', server.roles.size, true)
  .setColor(800070)
  
 message.channel.send({ embed });

} else
if(command === 'kick' ){

  let permiso = message.member.hasPermission("KICK_MEMBERS");
  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');

  if (message.member.hasPermission("KICK_MEMBERS")){ 
   if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
   if (!razon) return message.channel.send('Escriba una razón, `*kick @username [razón]`');
   if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
 
     message.guild.member(user).kick(razon);
     message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);
  } else
    message.channel.send('Tu no puedes patear a usuarios.')
    .then(m => {
       m.delete(5000);

    });
} else
if(command === 'ban'){

  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');

  if (message.member.hasPermission("BAN_MEMBERS")){ 
   if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
   if(!razon) return message.channel.send('Escriba un razón, `*ban @username [razón]`');
   if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');

     message.guild.member(user).ban(razon);
     message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);
  } else
    message.channel.send('Tu no puedes banear a usuarios.')
    .then(m => {
         m.delete(5000);

    });
} else

if(command === 'report'){
  let channel = client.channels.get('631957754072006667'); 
  let user = message.author;
  let reporte = args.join(' ');
  if(!reporte) return message.channel.send(`:grey_exclamation: | **Envia un reporte o dudas con: *report [reporte]**`)
  
  const embed = new Discord.RichEmbed()
   .setTitle(':e_mail: | **Reporte**')
   .setDescription('`Tu reporte se ha enviado al buzón del bot.`')
   .setDescription(reporte)
   .setThumbnail(`https://media.discordapp.net/attachments/576980879226961935/577344574931075072/carta.gif`)
   .setColor(0x77AEFF)
   .setFooter('Reporte enviado por '+ message.author.username)
 
  channel.send(embed)
  message.channel.send(":white_check_mark: | **Reporte enviado**")
         
  message.channel.send(embed).then(m =>  m.react("\u2709"))
} else

//eliminar mensajes *clear

if(command === 'clear'){
  if(!message.guild.me.permissionsIn(message.channel).hasPermission("MANAGE_MESSAGES")){
    return message.channel.send("Perdon, pero no tengo permisos")
}

  if(!message.member.permissionsIn(message.channel).hasPermission("MANAGE_MESSAGES")){
    return message.channel.send("Perdon, pero no tienes permisos")
}

  if(!args) return message.channel.send('Escriba la cantidad de mensajes a eliminar');
  let cantidadm = parseInt(args[0])

  if(!cantidadm) return message.reply("Introduce un numero por favor") 

  if(cantidadm > 100){
    message.channel.send("El maximo de mensajes que puedo borrar es 100, por lo tanto lo establecere automaticamente ahi")
    cantidadm = 100
  }

  message.channel.send(`Voy a borrar los ${cantidadm} mensajes`)

  message.channel.fetchMessages({limit: cantidadm}).then((mensajes) => {
    var msgs = mensajes.filter(m => !m.pinned && !m.system)


     message.channel.bulkDelete(msgs).then(() => {
         message.channel.send(`Listo, borre los ${cantidadm} mensajes :ok_hand:`).then(m => m.delete(20000))
     }).catch(e => {
          switch(e.message){
             case("You can only bulk delete messages that are under 14 days old."):{
                  message.channel.send("Solo puedo borrar mensajes con menos de 2 semanas de antigüedad")
              }
             //aqui ire poniendo mas mensajes a medida que se me ocurran o vea en el canal de ayuda
              default:{
                 console.log("Ocurrio un error desconocido en el comando para borrar mensajes \n" + e)
                  message.channel.send("Err, no pude borrar los mensajes :exclamation:")
            }
        }
    })
})
}  

if(command === 'sorteo'){
  message.channel.send('Afortunado: **'+ message.guild.members.random().user+'**');
}  
});
client.login(process.env.BOT_TOKEN);
