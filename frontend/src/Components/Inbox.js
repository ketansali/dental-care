import React, { useEffect, useState } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, ChannelList, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const chatClient = StreamChat.getInstance('dz5f4d5kzrue');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibGF0ZS1oaWxsLTUiLCJleHAiOjE2NTcxMDA4NjF9.nLzKRFH4ZjXkqa9VKCTpsIoP_TuHuqjyiO-8rwdNQCk';

chatClient.connectUser(
    {
        id: 'late-hill-5',
        name: 'late',
        image: 'https://getstream.io/random_png/?id=late-hill-5&name=late',
    },
    userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
    // add as many custom fields as you'd like
    image: 'https://www.drupal.org/files/project-images/react.png',
    name: 'Talk about React',
    members: ['late-hill-5'],
});

const Inbox = () => {
    return (
        <>
            <SideBar>
                <Header src="assets/images/inbox1.png" name="Inbox" />
                <div className='main-content'>
                    <div className='chatApp'>
                        <Chat client={chatClient} theme='messaging light'>
                            <Channel channel={channel}>
                                <Window>
                                    <ChannelHeader />
                                    <MessageList />
                                    <MessageInput />
                                </Window>
                                <Thread />
                            </Channel>
                        </Chat>
                    </div>
                </div>
            </SideBar>
        </>
    )
}

export default Inbox