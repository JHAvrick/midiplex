//TODO: Implement ProgramChangeNode

// import { MidiplexMessage } from "@/midiplex-message";
// import { MidiplexNodeInstance } from "@/node-instance";
// import { AllMessageTypes, getProgramChangeMessage, matchTrigger } from "@/util";

// type ProgramChangeNodeTypeDef = {
//     inputs: {
//         in: 'noteon' | 'noteoff' | 'controlchange'
//     },
//     outputs: {
//         out: 'programchange'
//     },
//     props: {
//         triggers: {
//             trigger: MidiplexTrigger,
//             program: IntRange<0, 128>,
//             channel?: IntRange<0, 17>,
//         }[]
//     },
//     state: {}
// }

// const ProgramChangeNodeDef :  MidiplexNodeDefinition<ProgramChangeNodeTypeDef> = {
//     name: 'Program Change',
//     key: 'PROGRAM_CHANGE_NODE',
//     description: '',
//     inputs: {
//         in: {
//             name: 'In',
//             messageTypes: ['noteon', 'noteoff', 'controlchange']
//         }
//     },
//     outputs: {
//         out: {
//             name: 'Out',
//             messageTypes: ['programchange']
//         }
//     },
//     props: {
//         triggers: {
//             name: 'Triggers',
//             value: []
//         }
//     },
//     node({ send, receive, prop }){
//         receive((message) => {
//             let triggers = prop('triggers');
//                 triggers.forEach((t) => {
//                     if (matchTrigger(t.trigger, message)){
//                         send(getProgramChangeMessage(t.program, t.channel ?? 0), 'out');
//                     }
//                 });
//         });
//     }
// };


// class ProgramChangeNode extends MidiplexNodeInstance<ProgramChangeNodeTypeDef> {
//     constructor(key: string, config: NodeConfig = {}){
//         super(key, ProgramChangeNodeDef);
//     }
// }

// export { ProgramChangeNodeTypeDef, ProgramChangeNodeDef, ProgramChangeNode };