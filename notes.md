Message Type
-------------
MessageTypeFilterNode - with modes 'filter' and 'pass'
MessageTypeSplitNode  - sends all messages to an edge corresponding to the message's type


Control Change
--------------
CCRangeFilterNode - with modes 'filter' and 'pass'
CCRangeNode - with modes 'filter', 'pass', 'clamp', 'scale'


Note
----
NoteTransposeNode - Transpose all notes through
NoteMapNode - Map notes to other notes
NoteRangeMode - with modes 'filter', 'pass', 'clamp'
NoteFilterNode - with modes 'filter' and 'pass'
NoteChorderNode - Map notes to chords
VelocityClampNode - Clamp note velocity within a range
VelocityCompressionNode - Compress note velocity above a certain threshold 
NoteToCCNode - https://steinberg.help/cubase_pro_plugin_reference/v12/en/_shared/topics/plug_ref/note_to_cc_r.html


Channel
-------
ChannelFilterNode - with modes 'filter' and 'pass'
ChannelSetNode
ChannelSplitNode


General
----
ClockNode
TogglePathNode
CustomNode


Commands
----
AllNotesOffNode - when trigger is activated, sends the "all notes off" command to all connected devices