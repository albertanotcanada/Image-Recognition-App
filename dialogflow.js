import Dialogflow from "react-native-dialogflow"
constructor(props)
{
    super(props);
    Dialogflow.setConfiguration(
        "4xxxxxxxe90xxxxxxxxc372", Dialogflow.LANG_ENGLISH
    );
}
<Button onPress={() => {
    Dialogflow.startListening(result=>{
        console.log(result);
    }, error=>{
        console.log(error);
    });
}}
/>
// only for iOS
Dialogflow.finishListening();
// after this call your callbacks from the startListening will be executed.
<Button onPress={() => {
    Dialogflow.requestQuery("Some text for your Dialogflow agent", result=>console.log(result), error=>console.log(error));
}}
/>
Dialogflow.requestEvent(
    "WELCOME",
    {param1: "yo mr. white!"},
    result=>{console.log(result);},
    error=>{console.log(error);}
);
const contexts = [{
    name: "deals",
    lifespan: 1,
    parameters: {
        Shop: "Rewe"
    }
}];

Dialogflow.setContexts(contexts);
Dialogflow.resetContexts(result=>{
    console.log(result);
}, error=>{
    console.log(error);
});
const permanentContexts = [{
    name: "Auth",
    // lifespan 1 is set automatically, but it's overrideable
    parameters: {
        AccessToken: "1234yo1234"
    }
}];

Dialogflow.setPermanentContexts(permanentContexts);
const entities = [{
    "name":"shop",
    "extend":true,
    "entries":[
        {
            "value":"Media Markt",
            "synonyms":["Media Markt"]
        }
    ]
}];

Dialogflow.setEntities(entities);
