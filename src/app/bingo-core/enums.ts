export enum TYPE_BINGO {
  TABLON = 'TABLON',
  NUMERO = 'NUMERO', //Es la tabla con las letras BINGO y solo vienen numeros para formar el numero dado en toda la tabla
  SIGNO = 'SIGNO', //Es la tabla con las letras BINGO y solo vienen numeros para formar el signo dado en toda la tabla
  MINI = 'MINI',
}

export enum STATE_NUMERO {
  UNCHECK = 'UNCHECK',
  CENTRAL = 'CENTRAL',
  CHECK = 'CHECK',
  EMPTY = 'EMPTY',
}
export enum LETTER_BINGO {
  B = 'B',
  I = 'I',
  N = 'N',
  G = 'G',
  O = 'O',
  EMPTY = 'EMPTY',
}

export enum TIPO_JUEGO {
  LLENA = 'LLENA', //TODA LA TABLA
  DIAGONAL = 'DIAGONAL',
  /**
   * 
   */
  TABLAS_NUMERO = 'TABLAS_NUMERO', //Toda la tabla debe estar llena
  TABLAS_SIGNO = 'TABLAS_SIGNO', //Toda la tabla debe estar llena
  TABLAS_MINI = 'TABLAS_MINI', //Toda la tabla debe estar llena
  /**
   * 
   */
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  D_GORDO = 'D_GORDO',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  LL_GORDO = 'LL_GORDO',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  R_GORDO = 'R_GORDO',
  S = 'S',
  S_GORDO = 'S_GORDO',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
  VENTEY3_GORDO = 'VENTEY3_GORDO',
  OCHO_GORDO = 'OCHO_GORDO',
  TRES_GORDO = 'TRES_GORDO',
  DIEZ_GORDO='DIEZ_GORDO',
  FE_GORDO='FE_GORDO'
}
export enum BINGO_ESTADO{
  CREADO = 'CREADO',
  INICIADO = 'INICIADO',
  FINALIZADO= 'FINALIZADO',
}