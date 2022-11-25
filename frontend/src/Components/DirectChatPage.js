import React, { useState } from 'react'

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

const DirectChatPage = () => {
    const [username, setUsername] = useState('')

    function createDirectChat(creds) {
        getOrCreateChat(
            creds,
            { is_direct_chat: true, usernames: [username] },
            () => setUsername('')
        )
    }

    function renderChatForm(creds) {
        return (
            <div>
                <input
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={() => createDirectChat(creds)}>
                    Create
                </button>
            </div>
        )
    }

    return (
        <ChatEngine
            height='100vh'
            userName='Chat'
            userSecret='123123'
            projectID='88f04cad-f35b-4bf8-b01d-87a75810a21b'
            renderNewChatForm={(creds) => renderChatForm(creds)}
        />
    )
}

export default DirectChatPage;