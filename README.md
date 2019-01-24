Aufgabe 1 (40 Punkte): Rest-File-Server  und -Client: Dateien neu anlegen, editieren und löschen
Ergänzen Sie die in Kapitel 11 vorgestellte REST-Anwendung, die Sie im Verzeichnis rest_files des Repositories für dieses Aufgabenblatt finden.

1.1 Server-Routen ergänzen
Ergänzen Sie die Routen für POST und DELETE im Javascript-Server-Code.

Per POST an die Collection-URL /files kann eine neue Datei angelegt werden, deren Name vom Server generiert wird. Die Response soll eine vollständige Repräsentation der neuen Ressource enthalten.

Per DELETE an eine Einzel-Ressourcen-URL (z.B. /files/some-file-with-a-nice-name) kann eien Datei gelöscht werden. Wählen Sie eine sinnvolle Response.

1.2 Client auf jQuery umstellen
Stellen Sie den vorhandenen (und in Aufgabe 1.3 neu erstellen) Client-Javascript-Code auf jQuery um. Ziel ist es, die Potenziale zu nutzen, die jQuery bietet, um Code kompakter zu machen. Stellen Sie zumindest Ajax-Requests, das Registrieren von Event-Handlern, DOM-Selektoren und -Manipulationen um.
1.3 Client-Interface vervollständigen
Vervollständigen Sie die im Client-Interface bereits angelegten Funktionen zum Anlegen, Bearbeiten und Löschen von Dateien. Die Anwendung soll weiterhin als Single-Page-App funktionieren. Das Bearbeiten neu oder vorhandener Dateien soll in einer Textarea geschehen. Achten Sie auf eine sinnvolle Fehlerbehandlung.
 
Aufgabe 2 (40 Punkte): Liveticker
Entwickeln Sie auf Basis der in Kapitel 10 vorgestellten Chat-Anwendung, die Sie im Verzeichnis liveticker des Repositories für dieses Aufgabenblatt finden, einen Liveticker mit mehreren Kanälen.

Die Anwendung soll folgende Anforderungen erfüllen:
Es gibt zwei Ansichten des Livetickers: Eine Lese-Ansicht, die nur Nachrichten anzeigen kann und eine Autoren-Ansicht, in der Nachrichten auch geschrieben werden können.
Die beiden Ansichten werden über verschiedene URLs angesprochen ( / für die Lese-Ansicht und /author für die Autoren-Ansicht). Sie müssen aber keinen Rechtecheck implementieren (in der Praxis wäre das natürlich wichtig).
Die Leseansicht bietet an der Seite eine Liste verfügbarer Kanäle, aus denen beliebig viele ausgewählt werden können. Veränderungen der Auswahl führen nicht zu einem Reload der Seite, sondern wirken sich einfach darauf aus, welche zukünftigen Nachrichten angezeigt werden.
Die Autorenansicht zeigt immer die Nachrichten aller Kanäle an. Beim Schreiben von Nachrichten ist ein Kanal auszuwählen.
Beispiel: Für eine Liveticker-Konferenz einer Sportliga wird für jedes Spiel ein Kanal angelegt und Fans können wählen, von welchen Spielen sie Nachrichten lesen wollen. Ein oder mehrere Autoren geben Ereignisse der Spiele über das Autoreninterface ein.

Technische Hinweise:
Ihre Client-Anwendung darf davon ausgehen, dass sich die Liste der verfügbaren Kanäle sich nach dem erstmaligen Laden nicht verändert. Sie muss aber von Server abgerufen werden und darf im Client nicht hart codiert sein. Auf dem Server können Sie die Kanal-Liste in einer Liste o.ä. ablegen und müssen keine dynamische Datenhaltung (Datei, Datenbank) verwenden.
Entwickeln Sie die Anwendung auf Basis der Chat-Anwendung und benutzen Sie socket.io für die Nachrichtenübermittlung.
socket.io bietet eine "Raum"- oder "Namespace"-Konzept, dass Sie ggf. nützlich finden: https://socket.io/docs/rooms-and-namespaces/#Rooms
 
Aufgabe 3 (20 Punkte): Liveticker-Erweiterung: Dynamische Kanal-Liste
Erweitern Sie den Liveticker dahingehend, dass die Liste verfügbarer Kanäle dynamisch ist:
Autoren können leicht erkennen, wie viele Leser ein Kanal aktuell hat.
Autoren können Kanäle anlegen und löschen.
Die Liste verfügbarer Kanäle aktualisiert sich dann in der Lese-Ansicht.
Details der Interface-Gestaltung und der technischen Umsetzung sind Ihnen überlassen.