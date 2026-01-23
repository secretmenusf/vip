import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gift, Share2, Copy, Check, CreditCard, Utensils, DollarSign } from 'lucide-react';
import { useState } from 'react';

const Invite = () => {
  const [copied, setCopied] = useState(false);
  const [creditAmount, setCreditAmount] = useState('25');
  const [inviteCode] = useState(() => {
    // Generate a random invite code or retrieve from user's profile
    return 'SM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  });

  const inviteUrl = `https://secretmenusf.com/invite?ref=${inviteCode}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inviteUrl)}&bgcolor=0a0a0a&color=fafafa`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Secret Menu - Premium Organic Meals',
          text: 'Try Secret Menu! Get a free sample - just pay for delivery.',
          url: inviteUrl,
        });
      } catch (err) {
        // User cancelled or share failed
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const creditOptions = [10, 25, 50, 100];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-[0.15em] mb-6">
              SHARE THE SECRET
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-xl mx-auto">
              Give your friends a taste of Chef Antje's culinary magic.
            </p>
          </div>

          {/* Gift Options Tabs */}
          <section className="mb-16">
            <Tabs defaultValue="meal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="meal" className="font-display tracking-wider text-sm">
                  <Utensils className="w-4 h-4 mr-2" />
                  GIFT A MEAL
                </TabsTrigger>
                <TabsTrigger value="credits" className="font-display tracking-wider text-sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  GIFT CREDITS
                </TabsTrigger>
              </TabsList>

              {/* Gift a Meal Tab */}
              <TabsContent value="meal">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center gap-2 mx-auto mb-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <Gift className="w-4 h-4 text-emerald-500" />
                      <span className="font-display text-xs tracking-wider text-emerald-500">FREE SAMPLE FOR FRIENDS</span>
                    </div>
                    <CardTitle className="font-display text-2xl tracking-wider">Give a Free Meal</CardTitle>
                    <CardDescription className="font-body">
                      Share your invite code. Friends get a free sample meal—they just pay $10 delivery.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    {/* QR Code */}
                    <div className="inline-block p-6 bg-foreground rounded-2xl">
                      <img
                        src={qrCodeUrl}
                        alt="Invite QR Code"
                        className="w-40 h-40"
                      />
                    </div>

                    <div>
                      <p className="font-display text-xs tracking-wider text-muted-foreground mb-2">YOUR INVITE CODE</p>
                      <p className="font-display text-3xl tracking-[0.2em] text-foreground">{inviteCode}</p>
                    </div>

                    {/* Invite URL */}
                    <div className="flex items-center gap-2 justify-center max-w-md mx-auto">
                      <div className="flex-1 px-4 py-3 bg-background/50 border border-border rounded-xl font-body text-sm text-muted-foreground truncate">
                        {inviteUrl}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyToClipboard}
                        className="shrink-0"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>

                    {/* Share Button */}
                    <Button
                      size="lg"
                      className="font-display tracking-wider bg-emerald-600 hover:bg-emerald-700"
                      onClick={shareInvite}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      SHARE INVITE
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gift Credits Tab */}
              <TabsContent value="credits">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center gap-2 mx-auto mb-4 px-4 py-2 rounded-full bg-mystical/10 border border-mystical/20">
                      <DollarSign className="w-4 h-4 text-mystical" />
                      <span className="font-display text-xs tracking-wider text-mystical">GIFT CREDITS</span>
                    </div>
                    <CardTitle className="font-display text-2xl tracking-wider">Send Credits to a Friend</CardTitle>
                    <CardDescription className="font-body">
                      Gift credits they can use for meals or Chef AI. Perfect for any occasion.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Credit Amount Selection */}
                    <div className="space-y-3">
                      <Label className="font-display text-xs tracking-wider text-muted-foreground">SELECT AMOUNT</Label>
                      <div className="grid grid-cols-4 gap-3">
                        {creditOptions.map((amount) => (
                          <Button
                            key={amount}
                            variant={creditAmount === String(amount) ? 'default' : 'outline'}
                            className={`font-display tracking-wider ${creditAmount === String(amount) ? 'bg-mystical hover:bg-mystical/90' : ''}`}
                            onClick={() => setCreditAmount(String(amount))}
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Label className="font-body text-sm text-muted-foreground shrink-0">Custom:</Label>
                        <div className="relative flex-1 max-w-[120px]">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            value={creditAmount}
                            onChange={(e) => setCreditAmount(e.target.value)}
                            className="pl-8 font-display"
                            min="5"
                            max="1000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Recipient Email */}
                    <div className="space-y-2">
                      <Label className="font-display text-xs tracking-wider text-muted-foreground">RECIPIENT'S EMAIL</Label>
                      <Input
                        type="email"
                        placeholder="friend@example.com"
                        className="font-body"
                      />
                    </div>

                    {/* Personal Message */}
                    <div className="space-y-2">
                      <Label className="font-display text-xs tracking-wider text-muted-foreground">PERSONAL MESSAGE (OPTIONAL)</Label>
                      <Input
                        placeholder="Enjoy some delicious meals on me!"
                        className="font-body"
                      />
                    </div>

                    {/* Summary */}
                    <div className="p-4 bg-muted/30 rounded-xl border border-border/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-body text-sm text-muted-foreground">Gift amount</span>
                        <span className="font-display text-lg">${creditAmount}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>~{Math.floor(Number(creditAmount) / 25)} meals or {Math.floor(Number(creditAmount) * 10)} AI messages</span>
                      </div>
                    </div>

                    {/* Send Button */}
                    <Button
                      size="lg"
                      className="w-full font-display tracking-wider bg-mystical hover:bg-mystical/90"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      SEND ${creditAmount} GIFT
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="font-display text-2xl tracking-[0.1em] mb-8 text-center">HOW IT WORKS</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border/30 bg-card/30 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center">
                    <span className="font-display text-lg">1</span>
                  </div>
                  <h3 className="font-display text-sm tracking-wider mb-2">SHARE OR GIFT</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Send your invite code or gift credits directly to friends.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/30 bg-card/30 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center">
                    <span className="font-display text-lg">2</span>
                  </div>
                  <h3 className="font-display text-sm tracking-wider mb-2">THEY ENJOY</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Friends get a free meal or credits to explore the menu.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/30 bg-card/30 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center">
                    <span className="font-display text-lg">3</span>
                  </div>
                  <h3 className="font-display text-sm tracking-wider mb-2">YOU EARN REWARDS</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Earn credits for every friend who subscribes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Rewards Info */}
          <Card className="border-border/30 bg-card/30">
            <CardHeader className="text-center">
              <CardTitle className="font-display text-2xl tracking-[0.1em]">REFERRAL REWARDS</CardTitle>
              <CardDescription className="font-body max-w-md mx-auto">
                The more you share, the more you earn. Track your referrals and rewards in your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                <div className="p-4 border border-border rounded-xl text-center">
                  <p className="font-display text-2xl text-foreground mb-1">$10</p>
                  <p className="font-body text-xs text-muted-foreground">Per referral</p>
                </div>
                <div className="p-4 border border-border rounded-xl text-center">
                  <p className="font-display text-2xl text-foreground mb-1">$50</p>
                  <p className="font-body text-xs text-muted-foreground">VIP bonus</p>
                </div>
                <div className="p-4 border border-border rounded-xl text-center">
                  <p className="font-display text-2xl text-emerald-500 mb-1">∞</p>
                  <p className="font-body text-xs text-muted-foreground">No limits</p>
                </div>
              </div>
              <div className="text-center">
                <Button variant="outline" size="lg" className="font-display tracking-wider" asChild>
                  <a href="/account">VIEW MY REFERRALS</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Invite;
