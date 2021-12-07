const Discord = require('discord.js');
const { prefix, token } = require('./config.json'); 
const client = new Discord.Client();
//client.user.setActivity("!help", {type: "PLAYING"});
client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (message.content === `hi`) {
		message.channel.send('Hello');
	} else if (message.content === `${prefix}help`) {
		message.channel.send('commands:\nhi --> hello\n!play (starts with) --> games\n!server --> server name, total members\n!user-info --> name, id\n!clear (amount) ---> delete mass amount of messages');
	} else if (message.content.startsWith(`${prefix}play`)) {
		message.channel.send('games'); 
	} else if (message.content === `${prefix}server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	} else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	} else if (message.content === `${prefix}changenamelol`) {
	client.user.setUsername("Peter's Slave");
	client.user.avatarURL()
	} else if (message.content === `${prefix}reply`) {
	message.reply("I replied")
	} else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	} else if (args[0] === 'foo') {
			return message.channel.send('bar');
	}
		message.channel.send(`First argument: ${args[0]}`);
	} else if (command === 'kick') {
		if (!message.mentions.user-s.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`do you want to kick: ${taggedUser.username}? `)


	} else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		}
		
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
		});
		
		// Send the entire array of strings as a message
		// By default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	} else if (command === 'clear') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to clear messages in this channel!');
		});
	}






	else console.log(message.content);
});
client.login(token);
