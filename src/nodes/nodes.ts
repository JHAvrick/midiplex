//barrel file for nodes, organized to match filesystem

//channel
import { ChannelSetNode } from './channel/channel-set-node';
import { ChannelSplitNode } from './channel/channel-split-node';

//controlchange
import { CCFilterNode } from './controlchange/cc-filter-node';
import { CCMapNode } from './controlchange/cc-map-node';
import { CCRangeNode } from './controlchange/cc-range-node';

//general
import { CustomFilterNode } from './general/custom-filter-node';
import { DebugNode } from './general/debug-node';
import { InputNode } from './general/input-node';
import { OutputNode } from './general/output-node';
import { TogglePathNode } from './general/toggle-path';

//message
import { MessageTypeFilterNode } from './message/message-type-filter-node';
import { MessageTypeSplitNode } from './message/message-type-split-node';

//note
import { NoteMapNode } from './note/note-map-node';
import { NoteMonoLatchNode } from './note/note-mono-latch-node';
import { NotePolyLatchNode } from './note/note-poly-latch-node';
import { NoteTransposeNode } from './note/note-transpose-node';


export {
    //channel
    ChannelSetNode,
    ChannelSplitNode,

    //controlchange
    CCFilterNode,
    CCMapNode,
    CCRangeNode,
    
    //general
    CustomFilterNode,
    DebugNode,
    InputNode,
    OutputNode,
    TogglePathNode,
    
    //message
    MessageTypeFilterNode,
    MessageTypeSplitNode,

    //note
    NoteMapNode,
    NoteMonoLatchNode,
    NotePolyLatchNode,
    NoteTransposeNode
}