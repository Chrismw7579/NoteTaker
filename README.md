# NoteTaker
Records user notes and saves them to a file.

Users enter a title for their note and the note into an input and textarea respectively.

The index file uses ajax calls to send the data back to the server where it is saved in a json file. 

Notes can be deleted by clicking a trash icon and an ajax call is sent to the server with the note id.

The note with that id is then removed from the json file and rewritten with all the id's reset. 
