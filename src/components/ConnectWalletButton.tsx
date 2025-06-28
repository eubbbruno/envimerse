"use client"

import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import * as Popover from '@radix-ui/react-popover'
import { Wallet, ChevronDown, User, Copy, ExternalLink, LogOut } from 'lucide-react'
import { useAccount, useDisconnect, useEnsName, useEnsAvatar } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'

const ConnectWalletButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold px-6 py-3 rounded-xl shadow-neonRing hover:shadow-neonRingHover transition-all duration-300 flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                  >
                    Wrong network
                  </Button>
                )
              }

              return (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={openChainModal}
                    className="bg-glass-white backdrop-blur-md border border-white/20 hover:border-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 8,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <WalletProfile account={account} openAccountModal={openAccountModal} />
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

interface WalletProfileProps {
  account: any
  openAccountModal: () => void
}

const WalletProfile: React.FC<WalletProfileProps> = ({ account, openAccountModal }) => {
  const { data: ensName } = useEnsName({ address: account.address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || undefined })
  const { disconnect } = useDisconnect()

  const [isOpen, setIsOpen] = React.useState(false)

  const displayName = ensName || `${account.address.slice(0, 6)}...${account.address.slice(-4)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.address)
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button className="bg-glass-white backdrop-blur-md border border-white/20 hover:border-brandMagenta/50 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-neonRing">
          {ensAvatar ? (
            <img
              alt="ENS Avatar"
              src={ensAvatar}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brandMagenta to-brandCyan flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
          )}
          {displayName}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </Popover.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Popover.Portal>
            <Popover.Content
              className="z-50"
              sideOffset={8}
              align="end"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 w-64 shadow-glass"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-brandMagenta/10 to-brandCyan/10 border border-brandMagenta/20">
                    {ensAvatar ? (
                      <img
                        alt="ENS Avatar"
                        src={ensAvatar}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brandMagenta to-brandCyan flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{ensName || 'Wallet'}</p>
                      <p className="text-gray-400 text-sm">{`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Button
                      onClick={copyToClipboard}
                      className="w-full justify-start bg-transparent hover:bg-white/10 text-white border-none p-3 h-auto"
                    >
                      <Copy className="w-4 h-4 mr-3" />
                      Copy Address
                    </Button>
                    
                    <Button
                      onClick={openAccountModal}
                      className="w-full justify-start bg-transparent hover:bg-white/10 text-white border-none p-3 h-auto"
                    >
                      <ExternalLink className="w-4 h-4 mr-3" />
                      View on Explorer
                    </Button>
                    
                    <Button
                      onClick={() => disconnect()}
                      className="w-full justify-start bg-transparent hover:bg-red-500/20 text-red-400 hover:text-red-300 border-none p-3 h-auto"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  )
}

export default ConnectWalletButton 