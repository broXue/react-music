import React from 'react';
import Player from '../page/player';
import Demo from '../page/demo';
import MusicList from '../page/musiclist'
import Sub1 from '../page/sub1';
import Sub2 from '../page/sub2';

const routes = [
    {
        path: '/play',
        components: Player
    },
    {
        path: '/demo',
        components: Demo,
        routes: [
            {
                path: '/demo/sub1',
                components: Sub1
            },
            {
                path: '/demo/sub2',
                components: Sub2
            }
        ]
    },
    {
        path: '/musicList',
        components: MusicList
    },

]

export default routes;