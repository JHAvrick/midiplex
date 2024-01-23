import { MidiplexMessage } from './midiplex-message';
import { MidiplexNodeInstance } from './node-instance';

declare global {
    type NonEmptyArray<T> = readonly [T, ...T[]];

    type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

    type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

    /**
     * --------------------------------------------------------------------------------------
     * Node definition - these types describe the structure of a node.
     * --------------------------------------------------------------------------------------
     */
    type MidiMessageType = 
        "clock" |
        "timecode" |
        "start" | 
        "stop" |
        "noteon" |
        "noteoff" |
        "controlchange" |
        "keyaftertouch" |
        "programchange" |
        "channelaftertouch" |
        "pitchbend" |

        // MIDI channel mode events
        "allnotesoff" |
        "allsoundoff" |
        "localcontrol" |
        "monomode" |
        "omnimode" |
        "resetallcontrollers" |

        // RPN/NRPN events
        "nrpn" |
        "nrpn-dataentrycoarse" |
        "nrpn-dataentryfine" |
        "nrpn-dataincrement" |
        "nrpn-datadecrement" |
        "rpn" |
        "rpn-dataentrycoarse" |
        "rpn-dataentryfine" |
        "rpn-dataincrement" |
        "rpn-datadecrement";

    type MidiChannelMessageType = 'noteon' | 'noteoff' | 'controlchange' | 'keyaftertouch' | 'programchange' | 'channelaftertouch' | 'pitchbend';

    type MidiClockMessageType = 'clock' | 'timecode' | 'start' | 'stop';

    //type MidiMessageType = 'noteoff' | 'noteon' | 'keyaftertouch' | 'polykeypressure' | 'controlchange' | 'programchange' | 'pitchbend' | 'channelaftertouch' | 'system';
    //type MidiChannelMessageType = 'noteoff' | 'noteon' | 'keyaftertouch' | 'controlchange' | 'programchange' | 'channelaftertouch' | 'pitchbend';
    type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
    type NoteWithOctave = `${Note}${number}`;

    type MidiplexTriggerMinMax = { min: IntRange<0, 128>, max: IntRange<0, 128> };
    type MidiplexTrigger = {
        test: (message: MidiplexMessage) => boolean
    } | {
        type: 'noteon' | 'noteoff',
        note?: number,
        velocity?: number | MidiplexTriggerMinMax
    } | {
        type: 'controlchange',
        cc?: number,
        value?: number | MidiplexTriggerMinMax
    } /* | {
        type: 'polykeypressure',
        note?: IntRange<0, 128>,
        pressure?: IntRange<0, 128> | MidiplexTriggerMinMax
    } */


    /**
     * --------------------------------------------------------------------------------------
     * Node configuration - these types describe the format to pass a configuration for a 
     * a node to a node instance.
     * --------------------------------------------------------------------------------------
     */
    interface NodeConfig<D extends MidiplexNodeTypeDescription> {
        /**
         * Pass in a set of property values to init the node with.
         */
        props?: { 
            [key in keyof D['props']]: typeof D['props'] 
        },
        /**
         * A node can be preconfigured to send messages to other nodes. The node key and edge key
         * can be specified as an array of two string [node, edge] or as an object. The node/edge
         * must already exist within the system or an error will be thrown.
         */
        // to?: {
        //     [key: string]: [string, string] | { node: string, edge: string }
        // }
    }

    interface EdgeNodeReference {
        receive: (message: MidiplexMessage, edge: string) => void,
    }

    /**
     * --------------------------------------------------------------------------------------
     * Node instances
     * --------------------------------------------------------------------------------------
     */
    interface MidiplexEdgeInstance<D extends MidiplexNodeTypeDescription> {
        /**
         * The edge key
         */
        key: string,
        /**
         * Message types
         */
        messageTypes: NonEmptyArray<MidiMessageType>
        /**
         * A reference to this edge's owner node.
         */
        node: EdgeNodeReference,
        /**
         * A reference to the edge's that this node sends to.
         */
        to: MidiplexEdgeInstance<any>[]
    }

    interface MidiplexNodeTypeDescription {
        props: { [key: string]: any },
        state: { [key: string]: any },
        inputs: { [key: string]: MidiMessageType },
        outputs: { [key: string]: MidiMessageType },
    }
    
    interface MidiplexNodeDefinition<T extends MidiplexNodeTypeDescription> {
        name: string,
        //key: string,
        //key should be a type of MidiplexNode
        key: string,
        description?: string,
        inputs?: {
            [key in keyof T['inputs']]: {
                name: string,
                messageTypes: NonEmptyArray<MidiMessageType>
            }
        }
        outputs?: {
            [key in keyof T['outputs']]: {
                name: string,
                messageTypes: NonEmptyArray<MidiMessageType>
            }
        },
        props?: {
            [key in keyof T['props']]: {
                name: string,
                value: typeof T['props'][key]
            }
        },
        state?: {
            [key in keyof T['state']]: {
                name: string,
                value: typeof T['state'][key]
            }
        },
        node?: (params: ({
            prop: <K extends keyof T['props']>(key: K) => T['props'][K],
            state: <K extends keyof T['state']>(key: K, newVal?: T['state'][K]) => T['state'][K],
            send: <K extends keyof T['outputs'] | 'thru'>(message: MidiplexMessage, edge: K) => void,
            receive: (handler: <K extends keyof T['inputs']>(message: MidiplexMessage, edge: K) => void) => void,
            update: (handler: () => void) => void
        })) => void
    }

    type MidiplexEdgeString = `${string}:${string}`;
    interface MidiplexGraph {
        nodes: {
            [key: string]: {
                type: MidiplexNodeType,
                props?: {
                    [key: string]: any 
                }
            }
        },
        links: [
            {
                fromNode: string,
                fromEdge: string,
                toNode: string,
                toEdge: string
            } | [MidiplexEdgeString, MidiplexEdgeString]
        ]
    }

    /**
     * --------------------------------------------------------------------------------------
     * Node types
     * --------------------------------------------------------------------------------------
     */
    type MidiplexNodeType = 
        'INPUT_NODE' | 
        'OUTPUT_NODE' | 
        'DEBUG_NODE' | 
        'MESSAGE_TYPE_PASS_NODE' | 
        'MESSAGE_TYPE_SPLIT_NODE' | 
        'TRANSPOSE_NODE' | 
        'CC_RANGE_NODE' | 
        'CC_MAP_NODE' | 
        'TOGGLE_PATH_NODE' | 
        'CUSTOM_FILTER_NODE' | 
        'PROGRAM_CHANGE_NODE' | 
        'CC_PASS_NODE' | 
        'NOTE_MAP_NODE' | 
        'SET_CHANNEL_NODE' |
        'SPLIT_CHANNEL_NODE' |
        'MONO_LATCH_NODE';
    
    enum MPNode {
        'OUTPUT_NODE' = 'OUTPUT_NODE',
        'INPUT_NODE' = 'INPUT_NODE',
        'DEBUG_NODE' = 'DEBUG_NODE',
        'MESSAGE_TYPE_PASS_NODE' = 'MESSAGE_TYPE_PASS_NODE',
        'MESSAGE_TYPE_SPLIT_NODE' = 'MESSAGE_TYPE_SPLIT_NODE',
        'TRANSPOSE_NODE' = 'TRANSPOSE_NODE',
        'CC_RANGE_NODE' = 'CC_RANGE_NODE',
        'CC_MAP_NODE' = 'CC_MAP_NODE',
        'TOGGLE_PATH_NODE' = 'TOGGLE_PATH_NODE',
        'CUSTOM_FILTER_NODE' = 'CUSTOM_FILTER_NODE',
        'PROGRAM_CHANGE_NODE' = 'PROGRAM_CHANGE_NODE',
        'CC_PASS_NODE' = 'CC_PASS_NODE',
        'NOTE_MAP_NODE' = 'NOTE_MAP_NODE',
        'SET_CHANNEL_NODE' = 'SET_CHANNEL_NODE',
        'MONO_LATCH_NODE' = 'MONO_LATCH_NODE'
    }

    /**
     * --------------------------------------------------------------------------------------
     * Prop types
     * --------------------------------------------------------------------------------------
     */
    type CCRange =  {
        min: IntRange<0, 128>,
        max: IntRange<0, 128>
    }; // | [IntRange<0, 128>, IntRange<0, 128>];

    interface CCRangeMap {
        [key: number]: CCRange
    }

    interface NoteMap {
        [key: number]: number[]
    }

}

export {} 