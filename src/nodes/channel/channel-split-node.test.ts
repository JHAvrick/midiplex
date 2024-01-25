import { expect, test } from '@jest/globals';
import { ChannelSplitNode } from './channel-split-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let node = new ChannelSplitNode('cc-map-node');
    node.connect('6', debug.getInputEdge('in'));

let channel1 = Util.Generate.controlchange(43, 127, 1);
let channel2 = Util.Generate.controlchange(43, 127, 2);
let channel6 = Util.Generate.controlchange(43, 127, 6);
let channelOutOfBounds = Util.Generate.controlchange(43, 127, 20); //channel out of bounds, expect 16

describe('ChannelSplitNode', () => {
    test('Message received on a specific channel is sent to the corresponding edge', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.channel === 6).toBe(true);
            done();
        });

        node.receive(channel1, 'in');
        node.receive(channel2, 'in');
        node.receive(channelOutOfBounds, 'in');
        node.receive(channel6, 'in');
    });
})