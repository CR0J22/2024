import { useState, useEffect } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("metas.db");
    return db;
}

const db = openDatabase();

function Items({ done: doneHeading, onPressItem }) {
    const [items, setItems] = useState(null);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from items where done = ?;`,
                [doneHeading ? 1 : 0],
                (_, { rows: { _array } }) => setItems(_array)
            );
        });
    }, []);

    const heading = doneHeading ? " Concluidos" : " A fazer";

    if (items === null || items.length === 0) {
        return null;
    }

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>{heading}</Text>
            {items.map(({ id, done, value }) => (

                <TouchableOpacity
                    key={id}
                    onPress={() => onPressItem && onPressItem(id)}
                    style={{
                        marginTop: 10,
                        backgroundColor: "#fff",
                        borderColor: done ? "#269400" : "#000000",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 8,

                    }}
                >
                    <Text style={{
                        color: done ? "#269400" : "#000000",
                        textAlign: 'center',

                        fontSize: 17,
                    }}>
                        {value}
                    </Text>
                    

                </TouchableOpacity>
            ))}
        </View>
    );
}

export default function Todo() {
    const [text, setText] = useState(null);
    const [forceUpdate, forceUpdateId] = useForceUpdate();

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists items (id integer primary key not null, done int, value text);"
            );
        });
    }, []);

    const add = (text) => {
        // is text empty?
        if (text === null || text === "") {
            return false;
        }

        db.transaction(
            (tx) => {
                tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
                tx.executeSql("select * from items", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
            null,
            forceUpdate
        );
    };

    return (
        <View style={styles.container}>


            {Platform.OS === "web" ? (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={styles.heading}>
                        Expo SQlite is not supported on web!
                    </Text>
                </View>
            ) : (
                <>

                    <View style={styles.flexRow}>

                        <TextInput
                            onChangeText={(text) => setText(text)}
                            onSubmitEditing={() => {
                                add(text);
                                setText(null);
                            }}
                            placeholder="Em 2024 eu vou..."

                            style={styles.input}
                            value={text}
                        />

                    </View>

                    <ScrollView style={styles.listArea}>
                        <Items
                            key={`forceupdate-todo-${forceUpdateId}`}
                            done={false}
                            onPressItem={(id) =>
                                db.transaction(
                                    (tx) => {
                                        tx.executeSql(`update items set done = 1 where id = ?;`, [
                                            id,
                                        ]);
                                    },
                                    null,
                                    forceUpdate
                                )
                            }
                        />
                        <Items
                            done
                            key={`forceupdate-done-${forceUpdateId}`}
                            onPressItem={(id) =>
                                db.transaction(
                                    (tx) => {
                                        tx.executeSql(`delete from items where id = ?;`, [id]);
                                    },
                                    null,
                                    forceUpdate
                                )
                            }
                        />
                    </ScrollView>


                </>
            )}
        </View>
    );
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? 44 : 44,
        padding: 20,

    },
    titleText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
    },
    titleCont: {
        height: 40,
        backgroundColor: '#269400',
        width: '100%',
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    flexRow: {
        flexDirection: "row",
    },
    input: {

        fontSize: 17,
        borderColor: "#269400",
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        height: 48,
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#ffffff'
    },
    listArea: {
        backgroundColor: "#f0f0f0",
        flex: 1,
        paddingTop: 16,
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    sectionHeading: {


        borderColor: "#269400",

        borderBottomWidth: 1,
        borderRightWidth: 1,

        borderBottomRightRadius: 14,

        fontSize: 20,
        marginBottom: 8,
    },
});