import * as vscode from 'vscode';

const FIRE_RATE = 50;

export function activate(context: vscode.ExtensionContext) {
	let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'vscode-gone-with-the-todo.sayGoodbye';

	let disposable = vscode.commands.registerCommand('vscode-gone-with-the-todo.sayHello', () => {
		vscode.window.showInputBox({
			placeHolder: 'Nothing',
			prompt: 'Oh, what\'s the next thing?',
			value: 'Nothing'
		}).then((value) => {
			if (!value) {
				vscode.window.showErrorMessage('You must have someting to do, I guess...');
				return;
			}
			statusBarItem.text = value;
			statusBarItem.show();
		});
	});

	let hideCommandDisposable = vscode.commands.registerCommand('vscode-gone-with-the-todo.sayGoodbye', async () => {
		const textArray = (
			"🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉" +
			statusBarItem.text
		).split(' ');
		while (textArray.length > 1) {
			textArray.pop();
			statusBarItem.text = textArray.join(' ');
			await new Promise(resolve => setTimeout(resolve, FIRE_RATE));
		}
		statusBarItem.hide();
	});

	context.subscriptions.push(disposable, hideCommandDisposable);
}

export function deactivate() { }
