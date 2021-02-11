let dynvar = new Map();

function gettextarea(id) {return document.getElementById(id).value;}

function conlog(text) {document.getElementById('console').value = document.getElementById('console').value + "\n" + text}

function runqsk(code) {
	let lines = code.split("\n")
	for (var i = 0; i < lines.length; i++) {evalLine(lines[i], i+1)}
	conlog('--DONE--')
}

function formatVars(line) {
	linef = line
	for (var [key, value] of dynvar.entries()) {linef = linef.replace("%%"+key+"%%", value)}
	return linef
}

function evalLine(line, i) {
	parts = line.split(':')
	cmd = parts[0]
	arg = parts[1]
	if(cmd.startsWith("//")) {
		conlog('COMMENT SKIPPED')
	} else if(cmd == "ALERT" || cmd == "ОБЪЯВИТЬ") {
		alert(formatVars(arg))
	} else if (cmd == "LOG" || cmd == "ЛОГ") {
		conlog(formatVars(arg))
	} else if (cmd == "LET" || cmd == "ЗАПИСАТЬ В") {
		larg = arg.split(" ")
		dynvar.set(larg[0], larg[2])
	} else if (cmd == "VARDUMP" || cmd == "ПОЛУЧИТЬ ЗНАЧЕНИЕ") {
		conlog("VARDUMP: %" + arg + "% :: " + dynvar.get(arg))
	} else if (cmd == "EVALJS" || cmd == "ВЫПОЛНИТЬ") {
		try {eval(arg)}
		catch (e) { conlog("ERROR WHILE RUNNING JS ON LINE " + i + "\nDETALIED LOG:\n" + e) }
	} else {
		conlog("ERROR SYNTAX ON LINE " + i)
	}
}