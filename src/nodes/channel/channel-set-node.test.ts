import { expect, test } from '@jest/globals';
import { ChannelSetNode } from './channel-set-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let node = new ChannelSetNode('cc-map-node', { 
        channel: 5
    });
    
    node.connect('out', debug.getInputEdge('in'));

let channel1 = Util.Generate.controlchange(43, 127, 1); //CC 0 is falsey - is this even a valid CC message?

describe('ChannelSetNode', () => {
    test('Message channel is set to specified new channel', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.channel === 5).toBe(true);
            done();
        });

        node.receive(channel1, 'in');
    });
})