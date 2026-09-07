export type Locale = 'en' | 'fa'

export type Messages = {
  appName: string
  welcomeTo: string
  chooseLanguage: string
  chooseGame: string
  english: string
  persian: string
  xo: string
  truthDare: string
  rps: string
  selectCompetitor: string
  playWithFriend: string
  playWithRobot: string
  friendSoon: string
  chooseDifficulty: string
  howChallenging: string
  easy: string
  medium: string
  hard: string
  selectStarter: string
  startWithYou: string
  startWithRobot: string
  youWins: string
  draws: string
  robotWins: string
  friendWins: string
  youWin: string
  youLose: string
  itsDraw: string
  playAgain: string
  moreGames: string
  home: string
  challengeAgain: string
  loading: string
  comingSoon: string
  yourTurn: string
  friendTurn: string
  robotTurn: string
  robotThinking: string
  chat: string
  chatPlaceholder: string
  chatSend: string
  chatEmpty: string
  chatMinimize: string
  chooseContentMode: string
  contentModeHint: string
  modeNormal: string
  modeAdult: string
  pickTruthOrDare: string
  pickTruthOrDareHint: string
  truth: string
  dare: string
  nextPrompt: string
  iAnswered: string
  yourTurnTd: string
  friendTurnTd: string
  changeContentMode: string
  waitingTitle: string
  waitingHeadline: string
  waitingBody: string
  waitingStatus: string
  sendToFriend: string
  copyInviteLink: string
  inviteCopied: string
  inviteSentHint: string
  inviteShareText: string
  simulateFriendJoin: string
  joiningSession: string
  joinInvalid: string
  vsFriend: string
  vsRobot: string
  rpsPick: string
  rpsWaitingReveal: string
  rpsRock: string
  rpsPaper: string
  rpsScissors: string
  youPicked: string
  friendPicked: string
  robotPicked: string
  enterRounds: string
  roundsHint: string
  roundProgress: string
  afterRounds: string
  nextRound: string
  roundWin: string
  roundLose: string
  roundDraw: string
  startMatch: string
  waitingRival: string
  pickBeforeTime: string
  lockedInHint: string
}

export const en: Messages = {
  appName: 'DUELLY',
  welcomeTo: 'Hey, welcome to',
  chooseLanguage: 'Which language do you vibe with?',
  chooseGame: 'What are we playing?',
  english: 'English',
  persian: 'فارسی',
  xo: 'XO',
  truthDare: 'Truth or Dare',
  rps: 'Rock Paper Scissors',
  selectCompetitor: 'Who are you up against?',
  playWithFriend: 'Challenge a friend',
  playWithRobot: 'Take on the robot',
  friendSoon: 'Almost ready — hang tight!',
  chooseDifficulty: 'How tough should it get?',
  howChallenging: 'Pick a vibe for the bot.',
  easy: 'Easy — Just vibing',
  medium: 'Medium — Keeps you on your toes',
  hard: 'Hard — No mercy',
  selectStarter: 'Who goes first?',
  startWithYou: 'I go first',
  startWithRobot: 'Robot goes first',
  youWins: 'You',
  draws: 'Draws',
  robotWins: 'Robot',
  friendWins: 'Friend',
  youWin: 'Nice! You won!',
  youLose: 'Oof — not this time.',
  itsDraw: "It's a tie!",
  playAgain: 'One more round',
  moreGames: 'More games',
  home: 'Home',
  challengeAgain: 'Switch difficulty',
  loading: 'Getting things ready…',
  comingSoon: 'Coming soon',
  yourTurn: 'Your move',
  friendTurn: "Friend's move",
  robotTurn: "Robot's move",
  robotThinking: 'Robot’s thinking…',
  chat: 'Chat',
  chatPlaceholder: 'Say something…',
  chatSend: 'Send',
  chatEmpty: 'Break the ice — drop a hello.',
  chatMinimize: 'Hide',
  chooseContentMode: 'What’s the mood?',
  contentModeHint: 'Keep it chill, or go +18?',
  modeNormal: 'Chill',
  modeAdult: '+18',
  pickTruthOrDare: 'Truth or Dare?',
  pickTruthOrDareHint: 'Tap one and let’s go.',
  truth: 'Truth',
  dare: 'Dare',
  nextPrompt: 'Another one',
  iAnswered: 'I answered',
  yourTurnTd: 'Your turn — pick Truth or Dare',
  friendTurnTd: "Friend's turn — pick Truth or Dare",
  changeContentMode: 'Change the mood',
  waitingTitle: 'Invite',
  waitingHeadline: 'Waiting for your friend',
  waitingBody: 'Send the invite in Telegram PV. Once they join, you’ll both drop into the same session.',
  waitingStatus: 'Still waiting…',
  sendToFriend: 'Send to a friend',
  copyInviteLink: 'Copy invite link',
  inviteCopied: 'Link copied — paste it in a chat.',
  inviteSentHint: 'Invite opened — pick a friend in Telegram.',
  inviteShareText: 'Come play with me on Duelly!',
  simulateFriendJoin: 'Friend joined (demo)',
  joiningSession: 'Joining your friend’s session…',
  joinInvalid: 'This invite is missing or expired.',
  vsFriend: 'vs friend',
  vsRobot: 'vs robot',
  rpsPick: 'Pick your move',
  rpsWaitingReveal: 'Revealing…',
  rpsRock: 'Rock',
  rpsPaper: 'Paper',
  rpsScissors: 'Scissors',
  youPicked: 'You',
  friendPicked: 'Friend',
  robotPicked: 'Robot',
  enterRounds: 'How many rounds?',
  roundsHint: 'Pick 1, 3, 5, or 7',
  roundProgress: 'Round {current} of {total}',
  afterRounds: 'After {count} rounds',
  nextRound: 'Next round',
  roundWin: 'You take this round!',
  roundLose: 'They got this one.',
  roundDraw: 'Tie round!',
  startMatch: 'Let’s go',
  waitingRival: 'Waiting for rival…',
  pickBeforeTime: 'Both pick before time’s up',
  lockedInHint: 'You’re locked on {move}',
}

export const fa: Messages = {
  appName: 'DUELLY',
  welcomeTo: 'خوش اومدی به',
  chooseLanguage: 'با کدوم زبان حال می‌کنی؟',
  chooseGame: 'چی بازی کنیم؟',
  english: 'English',
  persian: 'فارسی',
  xo: 'XO',
  truthDare: 'جرات یا حقیقت',
  rps: 'سنگ کاغذ قیچی',
  selectCompetitor: 'با کی می‌خوای بازی کنی؟',
  playWithFriend: 'با دوستم',
  playWithRobot: 'با ربات',
  friendSoon: 'به‌زودی میاد، یه کم صبر کن!',
  chooseDifficulty: 'چقدر سخت باشه؟',
  howChallenging: 'سطح ربات رو خودت انتخاب کن.',
  easy: 'آسون — الکی الکی',
  medium: 'متوسط — گاهی زرنگ',
  hard: 'سخت — بی‌رحم',
  selectStarter: 'کی اول بره؟',
  startWithYou: 'من اول',
  startWithRobot: 'ربات اول',
  youWins: 'تو',
  draws: 'مساوی',
  robotWins: 'ربات',
  friendWins: 'دوست',
  youWin: 'دمت گرم! بردی!',
  youLose: 'اوه… این‌دفعه باختی.',
  itsDraw: 'مساوی شدیم!',
  playAgain: 'یه دور دیگه',
  moreGames: 'بازی‌های بیشتر',
  home: 'خونه',
  challengeAgain: 'عوض کردن سختی',
  loading: 'یه لحظه صبر کن…',
  comingSoon: 'به‌زودی',
  yourTurn: 'نوبت توئه',
  friendTurn: 'نوبت دوستت',
  robotTurn: 'نوبت ربات',
  robotThinking: 'ربات داره فکر می‌کنه…',
  chat: 'چت',
  chatPlaceholder: 'یه چیزی بگو…',
  chatSend: 'ارسال',
  chatEmpty: 'سلام کن دیگه — یخ رو بشکن.',
  chatMinimize: 'ببند',
  chooseContentMode: 'چه حال‌وهوایی؟',
  contentModeHint: 'معمولی بمونه یا بریم +۱۸؟',
  modeNormal: 'معمولی',
  modeAdult: '+18',
  pickTruthOrDare: 'جرات یا حقیقت؟',
  pickTruthOrDareHint: 'یکی رو بزن بریم.',
  truth: 'حقیقت',
  dare: 'جرات',
  nextPrompt: 'یکی دیگه',
  iAnswered: 'جواب دادم',
  yourTurnTd: 'نوبت توئه — حقیقت یا جرات؟',
  friendTurnTd: 'نوبت دوستت — حقیقت یا جرات؟',
  changeContentMode: 'عوض کردن حال',
  waitingTitle: 'دعوت',
  waitingHeadline: 'منتظر دوستت باش',
  waitingBody: 'دعوت رو توی پیوی تلگرام بفرست. وقتی جوین بده، هر دو می‌رید تو همون سشن بازی.',
  waitingStatus: 'هنوز منتظریم…',
  sendToFriend: 'بفرست برای دوست',
  copyInviteLink: 'کپی لینک دعوت',
  inviteCopied: 'لینک کپی شد — بفرست توی چت.',
  inviteSentHint: 'دعوت باز شد — دوستت رو توی تلگرام انتخاب کن.',
  inviteShareText: 'بیا توی Duelly با هم بازی کنیم!',
  simulateFriendJoin: 'دوست جوین داد (دمو)',
  joiningSession: 'داری می‌ری تو سشن دوستت…',
  joinInvalid: 'این دعوت معتبر نیست یا تموم شده.',
  vsFriend: 'در برابر دوست',
  vsRobot: 'در برابر ربات',
  rpsPick: 'انتخاب کن',
  rpsWaitingReveal: 'در حال مشخص شدن…',
  rpsRock: 'سنگ',
  rpsPaper: 'کاغذ',
  rpsScissors: 'قیچی',
  youPicked: 'تو',
  friendPicked: 'دوست',
  robotPicked: 'ربات',
  enterRounds: 'چند راند بازی کنیم؟',
  roundsHint: '۱، ۳، ۵ یا ۷',
  roundProgress: 'راند {current} از {total}',
  afterRounds: 'بعد از {count} راند',
  nextRound: 'راند بعدی',
  roundWin: 'این راند مال تو!',
  roundLose: 'این یکی رفت واسه طرف مقابل.',
  roundDraw: 'این راند مساوی!',
  startMatch: 'بزن بریم',
  waitingRival: 'منتظر رقیب…',
  pickBeforeTime: 'هر دو تا تموم شدن تایم انتخاب کنین',
  lockedInHint: 'انتخابت قفل شد: {move}',
}

export const dictionaries: Record<Locale, Messages> = { en, fa }
