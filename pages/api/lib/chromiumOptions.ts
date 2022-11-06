import chrome from 'chrome-aws-lambda'

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean
}

const chromeExecPaths: Record<string, string> = {
  win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const exePath = chromeExecPaths[process.platform]

export async function getOptions(isDev: boolean): Promise<Options> {
  let options: Options

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }

  return options;
}